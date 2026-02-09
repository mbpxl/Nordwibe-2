import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchEventSource } from "@microsoft/fetch-event-source";

class RetriableError extends Error {}
class FatalError extends Error {}

export const useChatSSE = () => {
  const queryClient = useQueryClient();
  const abortControllerRef = useRef<AbortController | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 10;

  useEffect(() => {
    const connectSSE = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.error("No access token found");
          return;
        }

        // Оба запроса через proxy для same-site контекста
        const apiUrl = "/api/v2";

        console.log("Initializing SSE connection...");

        // POST запрос через proxy (теперь same-site, cookie установится)
        const initResponse = await fetch(`${apiUrl}/alert/sse`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
          credentials: "include", // Cookie будет установлена для localhost
        });

        if (!initResponse.ok) {
          throw new Error(`Failed to initialize SSE: ${initResponse.status}`);
        }

        console.log("SSE initialized successfully, sse_auth cookie set");

        await new Promise((resolve) => setTimeout(resolve, 100));

        abortControllerRef.current = new AbortController();
        const sseUrl = `${apiUrl}/alert/sse`;

        console.log("Opening SSE connection...");

        // GET SSE запрос через proxy (cookie будет отправлена)
        await fetchEventSource(sseUrl, {
          method: "GET",
          headers: {
            Accept: "text/event-stream",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
          credentials: "include", // Отправит sse_auth cookie
          signal: abortControllerRef.current.signal,

          async onopen(response) {
            if (response.ok) {
              console.log("✅ SSE connection established");
              reconnectAttemptsRef.current = 0;
              return;
            } else if (
              response.status >= 400 &&
              response.status < 500 &&
              response.status !== 429
            ) {
              console.error("❌ SSE client error:", response.status);
              const text = await response.text();
              console.error("Error response:", text);
              throw new FatalError(`Client error: ${response.status}`);
            } else {
              console.error("⚠️ SSE server error:", response.status);
              throw new RetriableError(`Server error: ${response.status}`);
            }
          },

          onmessage(event) {
            console.log("📨 SSE message received:", event.data);
            queryClient.invalidateQueries({ queryKey: ["chats"] });
          },

          onerror(error) {
            console.error("❌ SSE error:", error);

            if (error instanceof FatalError) {
              throw error;
            }

            reconnectAttemptsRef.current++;

            if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
              console.error("Max reconnect attempts reached");
              throw new FatalError("Too many reconnect attempts");
            }

            const delay = Math.min(
              1000 * Math.pow(2, reconnectAttemptsRef.current - 1),
              30000,
            );
            console.log(
              `🔄 Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current})`,
            );

            return delay;
          },

          openWhenHidden: true,
        });
      } catch (error) {
        if (error instanceof FatalError) {
          console.error("💀 Fatal SSE error:", error.message);
        } else {
          console.error("⚠️ SSE connection failed:", error);
        }
      }
    };

    connectSSE();

    return () => {
      if (abortControllerRef.current) {
        console.log("🔌 Closing SSE connection");
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      reconnectAttemptsRef.current = 0;
    };
  }, [queryClient]);
};
