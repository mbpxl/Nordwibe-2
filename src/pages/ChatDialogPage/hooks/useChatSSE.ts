import { useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface Message {
  id: string;
  text: string;
  created_at: string;
  updated_at: string;
  readed_at: string | null;
  from_user_id: string;
  to_user_id: string;
}

export const useChatSSE = (userId?: string) => {
  const queryClient = useQueryClient();
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    if (!userId) return;

    // Закрываем предыдущее соединение
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // Сбрасываем счетчик реконнекта
    reconnectAttemptsRef.current = 0;

    // Создаем SSE соединение с бэкендом
    const eventSource = new EventSource(
      `https://nordwibe.com/api/v2/chat/sse?user_id=${userId}`,
    );

    eventSource.onmessage = (event) => {
      try {
        const newMessage: Message = JSON.parse(event.data);

        // Обновляем кэш React Query
        queryClient.setQueryData(
          ["chats"],
          (oldData: Message[] | undefined) => {
            if (!oldData) return [newMessage];

            // Проверяем, нет ли уже такого сообщения
            const existingIndex = oldData.findIndex(
              (msg) => msg.id === newMessage.id,
            );

            if (existingIndex !== -1) {
              // Обновляем существующее сообщение (например, readed_at изменился)
              const updatedData = [...oldData];
              updatedData[existingIndex] = newMessage;
              return updatedData.sort(
                (a, b) =>
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime(),
              );
            } else {
              // Добавляем новое сообщение
              const updatedData = [...oldData, newMessage];
              return updatedData.sort(
                (a, b) =>
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime(),
              );
            }
          },
        );
      } catch (error) {
        console.error("Ошибка обработки SSE сообщения:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE ошибка соединения:", error);

      // Экспоненциальная задержка для реконнекта
      if (reconnectAttemptsRef.current < maxReconnectAttempts) {
        const delay = Math.min(
          1000 * Math.pow(2, reconnectAttemptsRef.current),
          30000,
        );

        setTimeout(() => {
          reconnectAttemptsRef.current++;
          if (eventSource.readyState === EventSource.CLOSED) {
            connect();
          }
        }, delay);
      } else {
        console.error(
          "Превышено максимальное количество попыток переподключения",
        );
      }
    };

    eventSourceRef.current = eventSource;
  }, [userId, queryClient]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (userId) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [userId, connect, disconnect]);

  return { disconnect, reconnect: connect };
};
