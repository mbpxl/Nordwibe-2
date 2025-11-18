import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccessToken } from "../../../shared/service/useAuthToken";

export const useOAuth2Callback = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate: fetchToken } = useAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      setIsProcessing(true);

      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");
      const error = urlParams.get("error");

      if (error) {
        setError(`OAuth error: ${error}`);
        setIsProcessing(false);
        return;
      }

      if (!code || !state) {
        setError("Missing OAuth parameters");
        setIsProcessing(false);
        return;
      }

      try {
        fetchToken(undefined, {
          //@ts-ignore
          onSuccess: (accessToken) => {
            navigate("/", { replace: true });
          },
          onError: (error) => {
            setError(`Failed to get tokens: ${error.message}`);
            setIsProcessing(false);
          },
        });
      } catch (err) {
        setError(`Callback processing failed: ${err}`);
        setIsProcessing(false);
      }
    };

    handleOAuthCallback();
  }, [fetchToken, navigate]);

  return { isProcessing, error };
};
