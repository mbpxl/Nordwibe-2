import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";
import type { userTypes } from "../types/userTypes";

const fetchUser = async (ids: string) => {
  const response = await api.get<userTypes[]>("/user/users", {
    params: { ids },
  });
  return response.data;
};

export const useGetUser = (ids: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", ids],
    queryFn: () => fetchUser(ids),
    staleTime: 20000,
    enabled: !!ids,
  });

  return { data, isLoading, isError };
};
