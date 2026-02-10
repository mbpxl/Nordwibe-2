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
          return;
        }

        const isDevelopment = window.location.hostname === "localhost";
        const apiUrl = isDevelopment
          ? "/api/v2"
          : "https://nordwibe.com/api/v2";

        const initResponse = await fetch(`${apiUrl}/alert/sse`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
          credentials: "include",
        });

        if (!initResponse.ok) {
          throw new Error(`Failed to initialize SSE: ${initResponse.status}`);
        }

        await new Promise((resolve) => setTimeout(resolve, 100));

        abortControllerRef.current = new AbortController();
        const sseUrl = `${apiUrl}/alert/sse`;

        await fetchEventSource(sseUrl, {
          method: "GET",
          headers: {
            Accept: "text/event-stream",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
          credentials: "include",
          signal: abortControllerRef.current.signal,

          async onopen(response) {
            if (response.ok) {
              reconnectAttemptsRef.current = 0;
              return;
            } else if (
              response.status >= 400 &&
              response.status < 500 &&
              response.status !== 429
            ) {
              throw new FatalError(`Client error: ${response.status}`);
            } else {
              throw new RetriableError(`Server error: ${response.status}`);
            }
          },

          onmessage(event) {
            queryClient.invalidateQueries({ queryKey: ["chats"] });
          },

          onerror(error) {
            if (error instanceof FatalError) {
              throw error;
            }

            reconnectAttemptsRef.current++;

            if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
              throw new FatalError("Too many reconnect attempts");
            }

            const delay = Math.min(
              1000 * Math.pow(2, reconnectAttemptsRef.current - 1),
              30000,
            );

            return delay;
          },

          openWhenHidden: true,
        });
      } catch (error) {
        if (!(error instanceof FatalError)) {
          return;
        }
      }
    };

    connectSSE();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      reconnectAttemptsRef.current = 0;
    };
  }, [queryClient]);
};
