import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

const fetchCompletedTests = async () => {
  const response = await api.get("/ranking/test/me");
  return response.data;
};

export const useGetCompletedTest = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["completedTests"],
    queryFn: fetchCompletedTests,
    staleTime: 3600000,
  });

  return { data, isLoading, isError };
};
