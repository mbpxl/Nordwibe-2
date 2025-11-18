import React from "react";
import { useOAuth2Callback } from "../../service/useOAuth2Callback";

const OAuthCallback: React.FC = () => {
  const { isProcessing, error } = useOAuth2Callback();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Ошибка авторизации
          </h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Вернуться к входу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Завершение авторизации
        </h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
        <p className="mt-4 text-gray-600">
          {isProcessing ? "Обработка авторизации..." : "Перенаправление..."}
        </p>
      </div>
    </div>
  );
};

export default OAuthCallback;
