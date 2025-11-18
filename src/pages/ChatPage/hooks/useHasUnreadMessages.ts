import { useUnreadCounts } from "./useUnreadCounts";

export const useHasUnreadMessages = (): boolean => {
  const unreadCounts = useUnreadCounts();

  return Object.values(unreadCounts).some((count) => count > 0);
};
