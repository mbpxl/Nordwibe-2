import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

const fetchStories = async () => {
  const response = await api.get<any>("/content/stories");
  return response.data;
};

export const useGetStories = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stories"],
    queryFn: fetchStories,
  });

  return { data, isLoading, isError };
};
