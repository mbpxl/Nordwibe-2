import { useMutation } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

type OAuthProvider = "vk" | "yandex";

interface OAuthCallbackParams {
  code: string;
  state: string;
}

export const useOAuthStart = () => {
  return useMutation({
    mutationFn: async (provider: OAuthProvider) => {
      const response = await api.post(
        `/auth/oauth2/start?provider=${provider}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      console.error("OAuth2 start failed:", error);
      throw error;
    },
  });
};

export const useOAuthCallback = () => {
  return useMutation({
    mutationFn: async ({ code, state }: OAuthCallbackParams) => {
      const response = await api.get(`/auth/oauth2/callback`, {
        params: { code, state },
      });
      return response.data;
    },
    onSuccess: async () => {
      try {
        const { fetchAccessToken } = await import("../../../shared/service/useAuthToken");
        await fetchAccessToken();

        window.location.href = "https://app.nordwibe.com/";
      } catch (error) {
        console.error("Failed to get access token after OAuth:", error);
        throw error;
      }
    },
    onError: (error) => {
      console.error("OAuth2 callback failed:", error);
      throw error;
    },
  });
};

export const useOAuth2 = () => {
  const startMutation = useOAuthStart();
  const callbackMutation = useOAuthCallback();

  return {
    startOAuth: startMutation.mutate,
    handleCallback: callbackMutation.mutate,
    isLoading: startMutation.isPending || callbackMutation.isPending,
    error: startMutation.error || callbackMutation.error,
  };
};