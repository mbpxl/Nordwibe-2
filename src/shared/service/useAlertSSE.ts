import { useEffect, useRef, useCallback, useState } from "react";

interface UseAlertSSEOptions {
  onNewMessage?: () => void;
}

export const useAlertSSE = (options: UseAlertSSEOptions = {}) => {
  const { onNewMessage } = options;

  const eventSourceRef = useRef<EventSource | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        console.error("No access token found");
        setIsConnected(false);
        return;
      }

      // Создаем EventSource с кастомными заголовками через EventSource полифил
      // Нужно установить npm пакет: npm install eventsource
      const EventSource = require("eventsource");

      const eventSource = new EventSource(
        "https://nordwibe.com/api/v2/alert/sse",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "text/event-stream",
          },
        },
      );

      eventSource.onopen = () => {
        setIsConnected(true);
      };

      eventSource.onmessage = (event: any) => {
        const message = event.data;

        try {
          const data = JSON.parse(message);
          if (data.type === "new_message") {
            onNewMessage?.();
          }
        } catch {}
      };

      eventSource.onerror = () => {
        setIsConnected(false);
        if (eventSource.readyState === 2) {
          // CLOSED
          setTimeout(() => {
            connect();
          }, 5000);
        }
      };

      eventSourceRef.current = eventSource;
    } catch (error) {
      setIsConnected(false);
    }
  }, [onNewMessage]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return { isConnected };
};
