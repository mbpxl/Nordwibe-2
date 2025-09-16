import { useEffect } from "react";

export const OAuthCallbackHandler = () => {
  const { mutateAsync: handleCallback } = useOAuthCallback();

  useEffect(() => {
    const processCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");
      const type = urlParams.get("type") || undefined;
      const device_id = urlParams.get("device_id") || undefined;

      if (!code || !state) {
        console.error("Отсутствуют необходимые параметры");
        return;
      }

      try {
        // Получаем и сохраняем токены
        const { accessToken, refreshToken } = await handleCallback({
          code,
          state,
          type,
          device_id,
        });

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Редиректим на главную без query-параметров
        window.location.replace("/");
      } catch (err) {
        console.error("Ошибка при обработке OAuth callback", err);
        window.location.replace("/login");
      }
    };

    processCallback();
  }, [handleCallback]);

  return <div>Обработка аутентификации...</div>;
};
function useOAuthCallback(): { mutateAsync: any } {
  throw new Error("Function not implemented.");
}
