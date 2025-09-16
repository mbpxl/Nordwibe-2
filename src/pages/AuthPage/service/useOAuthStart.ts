import { useMutation } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

type Provider = "vk" | "yandex";

const startOAuth = async (provider: Provider): Promise<string> => {
  const response = await api.post(`/auth/oauth2/start?provider=${provider}`);
  if (!response.data) throw new Error("Не удалось получить OAuth URL");
  return response.data;
};

export const useOAuthStart = () => {
  return useMutation({
    mutationFn: startOAuth,
    onSuccess: (url) => {
      window.location.href = url;
    },
  });
};
