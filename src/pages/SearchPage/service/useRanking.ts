import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";
import type { rankingTypes } from "../types/rankingTypes";
import { initialFilterState, type FilterType } from "../types/filterTypes";

const fetchRankingData = async (filters?: FilterType) => {
  const params: Record<string, any> = {};

  const mergedFilters = { ...initialFilterState, ...filters };

  Object.entries(mergedFilters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "" && value !== 0) {
      if (key === "occupation" || key === "pets" || key === "smoking_status") {
        if (Array.isArray(value) && value.length > 0) {
          params[key] = value;
        } else if (typeof value === "string" && value.trim() !== "") {
          params[key] = value;
        }
      } else if (key === "age_from" || key === "age_to") {
        params[key] = value.toString();
      } else if (typeof value === "string" || typeof value === "number") {
        params[key] = value.toString();
      }
    }
  });

  const response = await api.get<rankingTypes[]>("/ranking/", { params });
  return response.data;
};

export const useRanking = (filters?: FilterType) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["ranking-users", filters || {}],
    queryFn: () => fetchRankingData(filters),
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, isError, refetch };
};
