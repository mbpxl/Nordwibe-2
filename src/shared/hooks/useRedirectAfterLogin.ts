import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { MAIN_ROUTE } from "../utils/consts";

const MANUAL_LOGOUT_KEY = "manualLogout";

export const useRedirectAfterLogin = () => {
  const navigate = useNavigate();

  const getRedirectPath = useCallback(() => {
    const wasManualLogout = sessionStorage.getItem(MANUAL_LOGOUT_KEY);

    if (wasManualLogout) {
      sessionStorage.removeItem(MANUAL_LOGOUT_KEY);
      return MAIN_ROUTE;
    }

    const savedPath = sessionStorage.getItem("redirectAfterLogin");

    if (
      savedPath &&
      !["/welcome", "/signin", "/signup", "/settings"].some((path) =>
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

  const setManualLogout = useCallback(() => {
    sessionStorage.setItem(MANUAL_LOGOUT_KEY, "true");
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
    setManualLogout,
  };
};
