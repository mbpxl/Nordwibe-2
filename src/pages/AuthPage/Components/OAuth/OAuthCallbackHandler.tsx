// components/OAuthCallbackHandler.tsx
import { useSearchParams } from "react-router-dom";
import { useOAuthCallback } from "../../service/useOAuthCallback";

export const OAuthCallbackHandler = () => {
  const [searchParams] = useSearchParams();

  const { isLoading, error } = useOAuthCallback({
    code: searchParams.get("code"),
    state: searchParams.get("state"),
    type: searchParams.get("type") || undefined,
    device_id: searchParams.get("device_id") || undefined,
  });

  if (isLoading) return <div>Processing OAuth login...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Redirecting...</div>;
};
