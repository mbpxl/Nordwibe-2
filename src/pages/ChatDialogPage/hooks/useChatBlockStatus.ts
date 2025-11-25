import { useBlockedUsers } from "../../ProfilePage/service/useBlockedUsers";
import { useGetMe } from "../../ProfilePage/service/useGetMe";

export const useChatBlockStatus = (companionId: string | undefined) => {
  const { data: currentUser } = useGetMe();
  const { blockedUsers, isLoading } = useBlockedUsers();

  const isBlockedByMe = companionId
    ? blockedUsers.some((user) => user.id === companionId)
    : false;

  const isBlockedByThem = false;

  const isChatBlocked = isBlockedByMe || isBlockedByThem;

  return {
    isBlockedByMe,
    isBlockedByThem,
    isChatBlocked,
    isLoading,
    currentUserId: currentUser?.id,
  };
};
