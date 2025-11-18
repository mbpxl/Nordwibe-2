import { useMemo } from "react";
import { useGetMe } from "../../ProfilePage/service/useGetMe";
import { useGetChats } from "../service/useGetChats";

export const useUnreadCounts = () => {
  const { data: currentUser } = useGetMe();
  const { data: messages } = useGetChats();

  return useMemo(() => {
    if (!currentUser || !messages) {
      return {};
    }

    const unreadCounts: { [companionId: string]: number } = {};

    messages.forEach((message: any) => {
      if (message.to_user_id === currentUser.id && !message.readed_at) {
        const companionId = message.from_user_id;
        unreadCounts[companionId] = (unreadCounts[companionId] || 0) + 1;
      }
    });

    return unreadCounts;
  }, [messages, currentUser]);
};
