import { useMutation } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

type OAuthProvider = "vk" | "yandex";

const fetchOAuthStartUrl = async (provider: OAuthProvider): Promise<string> => {
  const response = await api.post<string>("/auth/oauth2/start", null, {
    params: { provider },
  });
  return response.data;
};

export const useOAuthStart = () => {
  return useMutation({
    mutationFn: fetchOAuthStartUrl,
    onSuccess: (url) => {
      window.location.href = url;
    },
  });
};
