import { useMutation } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

const startOAuth = async (provider: string) => {
  const response = await api.post(`/auth/oauth2/start?provider=${provider}`);
  return response.data;
};

export const useOAuthStart = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: startOAuth,
    onSuccess: (redirectUrl) => {
      window.location.href = redirectUrl;
    },
  });

  return { mutate, isPending, isError };
};
