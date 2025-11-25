import { useBlockedUsers } from "../service/useBlockedUsers";

export const useIsUserBlocked = (userId: string | undefined) => {
  const { blockedUsers, isLoading, isError } = useBlockedUsers();

  const isBlocked = userId
    ? blockedUsers.some((user) => user.id === userId)
    : false;

  return {
    isBlocked,
    isLoading: isLoading,
    isError,
  };
};
