import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

type MessageTypes = {
  text: string;
  to_user_id: string;
};

const sendMessage = async (data: MessageTypes) => {
  const response = await api.post("/chat/", data);
  return response.data;
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};
