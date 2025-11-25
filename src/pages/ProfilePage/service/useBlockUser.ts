import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

interface BlockUserData {
  blocked_user_id: string;
  reason: string;
}

const blockUser = async ({ blocked_user_id, reason }: BlockUserData) => {
  const response = await api.post(
    `/user/block/${blocked_user_id}`,
    JSON.stringify(reason),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const useBlockUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: blockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocked-users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { mutate, isPending, isError, isSuccess };
};
