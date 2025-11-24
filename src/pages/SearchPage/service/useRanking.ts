import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";
import type { rankingTypes } from "../types/rankingTypes";
import type { FilterType } from "../types/filterTypes";

const fetchRankingData = async (filters: FilterType = {}) => {
  const params: Record<string, string> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params[key] = value.toString();
    }
  });

  const response = await api.get<rankingTypes[]>("/ranking/", { params });
  return response.data;
};

export const useRanking = (filters: FilterType = {}) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["ranking-users", filters],
    queryFn: () => fetchRankingData(filters),
    staleTime: 20000,
  });

  return { data, isLoading, isError, refetch };
};
