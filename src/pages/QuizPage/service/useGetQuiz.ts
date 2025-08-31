import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

const fetchQuiz = async () => {
  const response = await api.get("/content/lessons");
  return response.data;
};

export const useGetQuiz = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["quiz"],
    queryFn: fetchQuiz,
    staleTime: 3600000,
  });

  return { data, isLoading, isError };
};
