import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageIds: string[]) => {
      const idsString = messageIds.join(",");
      return api.post(`/chat/read?message_id=${idsString}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });
};
