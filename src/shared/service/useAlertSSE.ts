import { useEffect, useRef, useCallback, useState } from "react";

interface UseAlertSSEOptions {
  onNewMessage?: () => void;
}

export const useAlertSSE = (options: UseAlertSSEOptions = {}) => {
  const { onNewMessage } = options;

  const eventSourceRef = useRef<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    if (eventSourceRef.current) {
      console.log("SSE: Closing previous connection");
      eventSourceRef.current.close();
    }

    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        console.log("SSE: No access token found");
        setIsConnected(false);
        return;
      }

      console.log("SSE: Connecting to server...");
      const EventSource = require("eventsource");

      eventSourceRef.current = new EventSource(
        "https://nordwibe.com/api/v2/alert/sse",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "text/event-stream",
          },
        },
      );

      eventSourceRef.current.onopen = () => {
        console.log("SSE: Connection opened");
        setIsConnected(true);
      };

      eventSourceRef.current.onmessage = (event: any) => {
        console.log("SSE: Message received:", event.data);
        onNewMessage?.();
      };

      eventSourceRef.current.onerror = (error: any) => {
        console.log("SSE: Error:", error);
        setIsConnected(false);

        if (eventSourceRef.current?.readyState === 2) {
          console.log("SSE: Reconnecting in 5 seconds...");
          setTimeout(() => {
            connect();
          }, 5000);
        }
      };
    } catch (error) {
      console.log("SSE: Connection error:", error);
      setIsConnected(false);
    }
  }, [onNewMessage]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      console.log("SSE: Disconnecting");
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    console.log("SSE: Setting up connection");
    connect();

    return () => {
      console.log("SSE: Cleaning up");
      disconnect();
    };
  }, [connect, disconnect]);

  return { isConnected };
};
