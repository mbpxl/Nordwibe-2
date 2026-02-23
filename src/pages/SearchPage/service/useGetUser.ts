import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";
import type { userTypes } from "../types/userTypes";

const fetchUser = async (ids: string[]) => {
  const response = await api.get<userTypes[]>("/user/users", {
    params: { ids: ids.join(",") },
  });
  return response.data;
};

export const useGetUser = (ids: string[]) => {
  const sortedIds = [...ids].sort();
  const idsKey = sortedIds.join(",");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", idsKey],
    queryFn: () => fetchUser(sortedIds),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    enabled: ids.length > 0,
  });

  return { data, isLoading, isError };
};
