import { useEffect } from "react";
import { useAccessToken } from "../../../shared/service/useAuthToken";
import { useOAuthStart } from "./useOAuthStart";

export const useOAuth = () => {
  const { mutateAsync: startOAuth2 } = useOAuthStart();
  const { mutateAsync: refreshToken, isPending: isRefreshing } =
    useAccessToken();

  useEffect(() => {
    const tryRefreshToken = async () => {
      try {
        await refreshToken();
        window.dispatchEvent(
          new CustomEvent("authChange", {
            detail: { isAuthenticated: true },
          })
        );

        // После успешного обновления токена перенаправляем на главную
        window.location.href = "/";
      } catch (error) {
        console.log("Требуется аутентификация");
        window.dispatchEvent(
          new CustomEvent("authChange", {
            detail: { isAuthenticated: false },
          })
        );
      }
    };

    // Проверяем наличие токенов при инициализации
    const accessToken = localStorage.getItem("accessToken");
    const refreshTokenValue = localStorage.getItem("refreshToken");

    if (accessToken && refreshTokenValue) {
      tryRefreshToken();
    }
  }, [refreshToken]);

  const loginWithOAuth2 = async (provider: "vk" | "yandex") => {
    await startOAuth2(provider);
  };

  return {
    loginWithOAuth2,
    isAuthenticating: isRefreshing,
  };
};
