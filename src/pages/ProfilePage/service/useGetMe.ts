import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

export const useGetMe = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-me"],
    queryFn: fetchMyProfile,
    staleTime: 10000,
  });

  return { data, isLoading, isError };
};

const fetchMyProfile = async () => {
  const response = await api.get("/user/me");
  return response.data;
};
