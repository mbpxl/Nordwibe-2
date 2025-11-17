import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PrivateSettingsTypes } from "../types/PrivateSettingsTypes";
import { api } from "../../../shared/plugin/axios";

export const useChangePrivate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: Partial<PrivateSettingsTypes>) => {
      const { data } = await api.put("/user/me/private", settings);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
};
