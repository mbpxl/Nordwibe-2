import React from "react";
import { useOAuth2 } from "../../service/useOAuth2";

const OAuthButtons: React.FC = () => {
  const { startOAuth2, isStarting } = useOAuth2();

  const handleOAuthStart = async (provider: "vk" | "yandex") => {
    console.log(`Starting OAuth2 for ${provider}`);

    try {
      startOAuth2(provider, {
        onSuccess: (redirectUrl) => {
          console.log("Success - Redirecting to:", redirectUrl);

          // Упрощенная проверка - просто редиректим
          if (redirectUrl) {
            window.location.href = redirectUrl;
          } else {
            console.error("Empty redirect URL");
            alert("Произошла ошибка при авторизации. Попробуйте еще раз.");
          }
        },
        onError: (error) => {
          console.error("OAuth2 start error:", error);
          alert(`Ошибка авторизации: ${error.message}`);
        },
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Неожиданная ошибка. Попробуйте еще раз.");
    }
  };

  return (
    <div className="mt-2 space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Или войдите через</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={isStarting}
          onClick={() => handleOAuthStart("vk")}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isStarting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12.0,2.0c-5.5,0-10.0,4.5-10.0,10.0s4.5,10.0,10.0,10.0s10.0-4.5,10.0-10.0S17.5,2.0,12.0,2.0z M16.6,13.6
                  c-0.2,0.5-0.7,1.1-1.4,1.7c-0.7,0.6-1.2,1.0-1.6,1.2c-0.4,0.2-0.8,0.3-1.2,0.3c-0.4,0-0.7-0.1-1.0-0.3c-0.3-0.2-0.5-0.5-0.6-0.9
                  c-0.1-0.4-0.1-1.2-0.1-2.4c0-1.2,0-2.1,0-2.7c0-0.6,0-1.1,0-1.5h1.9l0.1,1.2c0.1,0.8,0.2,1.4,0.3,1.8c0.1,0.4,0.3,0.7,0.5,0.9
                  c0.2,0.2,0.5,0.3,0.9,0.3c0.4,0,0.8-0.1,1.2-0.4c0.4-0.3,0.7-0.6,1.0-1.0c0.3-0.4,0.5-0.8,0.7-1.2c0.2-0.4,0.3-0.8,0.4-1.2
                  c0.1-0.4,0.1-0.7,0.1-1.0h1.9c0,0.4-0.1,0.9-0.2,1.4c-0.1,0.5-0.3,1.0-0.5,1.5c-0.2,0.5-0.5,1.0-0.9,1.4c-0.4,0.4-0.8,0.8-1.3,1.1
                  c0.5,0.3,0.9,0.7,1.3,1.2c0.4,0.5,0.7,1.0,0.9,1.6c0.2,0.6,0.4,1.2,0.5,1.9c0.1,0.7,0.1,1.3,0.1,1.9h-1.9c0-0.5-0.1-1.1-0.2-1.7
                  C17.1,14.7,16.9,14.1,16.6,13.6z"
                />
              </svg>
              <span className="ml-2">VK</span>
            </>
          )}
        </button>

        <button
          type="button"
          disabled={isStarting}
          onClick={() => handleOAuthStart("yandex")}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isStarting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
          ) : (
            <>
              <span className="font-bold text-red-600">Я</span>
              <span className="ml-2">Yandex</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default OAuthButtons;
