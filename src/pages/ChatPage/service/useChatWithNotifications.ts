import { useAlertSSE } from "../../../shared/service/useAlertSSE";

interface UseChatWithNotificationsOptions {
  userId?: string;
  onNewMessage?: () => void;
}

export const useChatWithNotifications = (
  options: UseChatWithNotificationsOptions = {},
) => {
  const { onNewMessage } = options;

  const { isConnected } = useAlertSSE({
    onNewMessage: () => {
      console.log("ChatNotifications: New message notification received");
      onNewMessage?.();
    },
  });

  console.log("ChatNotifications: Connection status:", isConnected);

  return { isConnected };
};
