import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

const unblockUser = async (blocked_user_id: string) => {
  const response = await api.post(`/user/unblock/${blocked_user_id}`);
  return response.data;
};

export const useUnblockUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: unblockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocked-users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { mutate, isPending, isError, isSuccess };
};
