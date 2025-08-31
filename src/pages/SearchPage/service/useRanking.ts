import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";
import type { rankingTypes } from "../types/rankingTypes";

const fetchRankingData = async () => {
  const response = await api.get<rankingTypes[]>("/ranking/");
  return response.data;
};

export const useRanking = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ranking-users"],
    queryFn: fetchRankingData,
    staleTime: 20000,
  });

  return { data, isLoading, isError };
};
