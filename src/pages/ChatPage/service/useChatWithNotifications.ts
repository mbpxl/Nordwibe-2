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
      onNewMessage?.();
    },
  });

  return { isConnected };
};
