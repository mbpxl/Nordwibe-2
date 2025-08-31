import { useQuery } from "@tanstack/react-query"
import { api } from "../../../shared/plugin/axios";

const fetchCities = async (q: string) => {
  const response = await api.get("/city", { params: { q } });
  return response.data;
};

export const useGetCities = (q: string) => {
  const {data, isLoading, isError} =  useQuery({
    queryKey: ["cities", q],
    queryFn: () => fetchCities(q),
    enabled: q.length > 2,
    staleTime: 1000 * 60,
		retry: 2,
  });
	return {data, isLoading, isError};
};