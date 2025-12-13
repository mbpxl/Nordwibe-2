import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useOAuth2 } from "../../service/useOAuth2";

const OAuthCallback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleCallback, error } = useOAuth2();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      if (!code || !state) {
        console.error("Missing code or state parameters");
        navigate("/login", { state: { error: "Неверные параметры авторизации" } });
        return;
      }

      try {
        await handleCallback({ code, state });

        await queryClient.invalidateQueries({ queryKey: ["user"] });

      } catch (err) {
        console.error("OAuth callback error:", err);
        navigate("/login", {
          state: {
            error: "Ошибка авторизации. Пожалуйста, попробуйте снова."
          }
        });
      }
    };

    handleOAuthCallback();
  }, [location.search, handleCallback, navigate, queryClient]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-2xl mb-4">Ошибка авторизации</div>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Вернуться к входу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <div className="mt-4 text-lg">Завершаем авторизацию...</div>
      </div>
    </div>
  );
};

export default OAuthCallback;