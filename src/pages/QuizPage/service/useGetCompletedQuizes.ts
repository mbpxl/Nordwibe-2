import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

export interface CompletedQuizAnswer {
  question_id: string;
  answer_id: string;
}

const fetchCompletedQuizes = async (): Promise<CompletedQuizAnswer[]> => {
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
