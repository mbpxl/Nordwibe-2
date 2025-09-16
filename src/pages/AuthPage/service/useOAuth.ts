// hooks/useAuth.ts
import { useEffect } from "react";
import { useAccessToken } from "../../../shared/service/useAuthToken";
import { useOAuthStart } from "./useOAuthStart";

export const useOAuth = () => {
  const { mutateAsync: startOAuth2 } = useOAuthStart();
  const { mutateAsync: refreshToken, isPending: isRefreshing } =
    useAccessToken();

  useEffect(() => {
    // Пытаемся обновить токен при загрузке приложения
    const tryRefreshToken = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.log("Требуется аутентификация");
      }
    };

    tryRefreshToken();
  }, [refreshToken]);

  const loginWithOAuth2 = async (provider: "vk" | "yandex") => {
    await startOAuth2(provider);
  };

  return {
    loginWithOAuth2,
    isAuthenticating: isRefreshing,
  };
};
