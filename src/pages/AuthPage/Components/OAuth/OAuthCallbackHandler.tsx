import { useEffect } from "react";
import { useOAuth2Callback } from "../../service/useOAuthCallback";

export const OAuthCallbackHandler = () => {
  const { mutateAsync: handleCallback } = useOAuth2Callback();

  useEffect(() => {
    const processCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");
      const type = urlParams.get("type") || undefined;
      const device_id = urlParams.get("device_id") || undefined;

      if (!code || !state) {
        console.error("Missing required parameters");
        window.location.replace("/login?error=missing_params");
        return;
      }

      try {
        const { accessToken, refreshToken } = await handleCallback({
          code,
          state,
          type,
          device_id,
        });

        // Сохраняем токены
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Создаем кастомное событие для уведомления приложения об изменении аутентификации
        window.dispatchEvent(
          new CustomEvent("authChange", {
            detail: { isAuthenticated: true },
          })
        );

        // Очищаем URL параметры и редиректим
        window.history.replaceState({}, document.title, "/");
        window.location.href = "/";
      } catch (err) {
        console.error("OAuth callback error:", err);
        window.location.replace("/login?error=oauth_failed");
      }
    };

    processCallback();
  }, [handleCallback]);

  return <div>Завершение аутентификации...</div>;
};
