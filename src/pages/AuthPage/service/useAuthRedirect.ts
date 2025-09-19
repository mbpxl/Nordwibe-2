import { useState, useEffect } from "react";

export const useAuthRedirect = () => {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        try {
          // Проверяем валидность токена (можно добавить дополнительную проверку)
          // Если токен валиден, перенаправляем на главную
          window.location.href = "/";
        } catch (error) {
          // Если токен невалиден, очищаем хранилище
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setIsChecking(false);
        }
      } else {
        setIsChecking(false);
      }
    };

    checkAuthAndRedirect();
  }, []);

  return isChecking;
};
