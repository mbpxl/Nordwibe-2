import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

const fetchTests = async () => {
  const response = await api.get("/content/tests");
  return response.data;
};

export const useGetTests = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tests"],
    queryFn: fetchTests,
    staleTime: 3600000,
  });

  return { data, isLoading, isError };
};
