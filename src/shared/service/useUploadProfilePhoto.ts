import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../plugin/axios";

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("upload_file", file);

      const { data } = await api.post("/user/me/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-me"] });
    },
  });
};
