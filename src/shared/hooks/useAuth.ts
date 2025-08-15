import { useEffect, useState } from "react"

export const useAuth = () => {
  const token = localStorage.getItem("access_token");
  const [isAuth, setIsAuth] = useState<boolean>(!!token);

  useEffect(() => {
    setIsAuth(!!token);
  }, [token]);

  return {isAuth};
}