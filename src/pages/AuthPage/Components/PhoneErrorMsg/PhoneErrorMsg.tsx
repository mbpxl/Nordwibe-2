const ERROR_MESSAGES: Record<number | string, string> = {
  400: "Неправильный код",
  403: "Доступ запрещен",
  404: "Ресурс не найден",
  409: "Номер уже используется",
  429: "Слишком много попыток. Попробуйте позже",
  500: "Извините, сервис временно недоступен",
  502: "Ошибка соединения",
  503: "Сервис временно недоступен",
  default: "Произошла ошибка. Пожалуйста, попробуйте еще раз",
  invalid_phone: "Неверный формат номера телефона",
  invalid_code: "Неверный код подтверждения",
  network_error: "Ошибка сети. Проверьте подключение к интернету",
};

export const getErrorMessage = (errorCode?: number | string): string => {
  if (!errorCode) return ERROR_MESSAGES.default;

  return ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.default;
};

const WrongData: React.FC<{
  isError: boolean;
  message?: string;
  errorCode?: number | string;
}> = ({ isError, message, errorCode }) => {
  const displayMessage = message || getErrorMessage(errorCode);

  return (
    <div className="error-container">
      <p
        className={`text-red-500 text-center text-sm ${
          isError
            ? "visible opacity-100 max-h-10"
            : "invisible opacity-0 max-h-0"
        }`}
      >
        {displayMessage}
      </p>
    </div>
  );
};

export default WrongData;
