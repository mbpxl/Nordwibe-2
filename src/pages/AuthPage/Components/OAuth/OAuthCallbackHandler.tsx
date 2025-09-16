// components/OAuthCallbackHandler.tsx
import { useEffect } from "react";

export const OAuthCallbackHandler = () => {
  const { mutateAsync: handleCallback } = useOAuthCallback();
  const { mutateAsync: refreshToken } = useAccessToken();

  useEffect(() => {
    const processCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");
      const type = urlParams.get("type") || undefined;
      const device_id = urlParams.get("device_id") || undefined;

      if (!code || !state) {
        throw new Error("Отсутствуют необходимые параметры");
      }

      await handleCallback({ code, state, type, device_id });
      await refreshToken();

      // Перенаправляем на главную после успешной аутентизации
      window.location.href = "/";
    };

    processCallback();
  }, [handleCallback, refreshToken]);

  return <div>Обработка аутентификации...</div>;
};
function useOAuthCallback(): { mutateAsync: any } {
  throw new Error("Function not implemented.");
}

function useAccessToken(): { mutateAsync: any } {
  throw new Error("Function not implemented.");
}
