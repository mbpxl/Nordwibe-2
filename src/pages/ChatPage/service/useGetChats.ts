import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

const fetchChats = async () => {
  const { data } = await api.get("/chat/");
  return data.sort(
    (a: any, b: any) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
};

export const useGetChats = (companionId: string | null) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["chats", "active", companionId],
    queryFn: fetchChats,
    staleTime: 0,
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
  });

  return { data, isLoading, isError, refetch };
};
