import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

const fetchCompletedQuizes = async () => {
  const response = await api.get("/ranking/quiz/me");
  return response.data;
};

export const useGetCompletedQuizes = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["completedQuizzes"],
    queryFn: fetchCompletedQuizes,
    staleTime: 3600000,
  });

  return { data, isLoading, isError };
};
