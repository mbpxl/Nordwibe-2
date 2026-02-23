import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

const fetchBlockedUsers = async (): Promise<any[]> => {
  const response = await api.get<any[]>("/user/blocked_users");
  return response.data;
};

export const useBlockedUsers = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["blocked-users"],
    queryFn: fetchBlockedUsers,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  return {
    blockedUsers: data || [],
    isLoading,
    isError,
    refetch,
  };
};
