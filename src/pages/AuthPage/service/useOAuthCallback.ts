import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAccessToken } from "../../../shared/service/useAuthToken";

export const useOAuthCallback = () => {
  const navigate = useNavigate();
  const handled = useRef(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken || handled.current) return;
    handled.current = true;

    const run = async () => {
      try {
        await fetchAccessToken();
        navigate("/", { replace: true });
      } catch {
        navigate("/welcome", { replace: true });
      }
    };

    run();
  }, []);
};
