import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

const fetchChats = async () => {
  const { data } = await api.get("/chat/");

  return data.sort(
    (a: any, b: any) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
};

export const useGetChats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats,
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, isError };
};
