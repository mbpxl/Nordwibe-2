import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { MAIN_ROUTE } from "../utils/consts";

export const useRedirectAfterLogin = () => {
  const navigate = useNavigate();

  const getRedirectPath = useCallback(() => {
    const savedPath = sessionStorage.getItem("redirectAfterLogin");

    if (
      savedPath &&
      !["/welcome", "/signin", "/signup"].some((path) =>
        savedPath.startsWith(path)
      )
    ) {
      return savedPath;
    }

    return MAIN_ROUTE;
  }, []);

  const clearRedirectPath = useCallback(() => {
    sessionStorage.removeItem("redirectAfterLogin");
  }, []);

  const performRedirect = useCallback(() => {
    const redirectPath = getRedirectPath();
    clearRedirectPath();
    navigate(redirectPath, { replace: true });
  }, [navigate, getRedirectPath, clearRedirectPath]);

  return {
    getRedirectPath,
    clearRedirectPath,
    performRedirect,
  };
};
