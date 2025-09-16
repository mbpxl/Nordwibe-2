import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../../shared/plugin/axios";

const handleOAuthCallback = async (params: {
  code: string;
  state: string;
  type?: string;
  device_id?: string;
}) => {
  const response = await api.get("/auth/oauth2/callback", { params });
  return response.data;
};

export const useOAuthCallback = (params: {
  code: string | null;
  state: string | null;
  type?: string;
  device_id?: string;
}) => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["oauth-callback", params],
    queryFn: () => handleOAuthCallback(params as any),
    enabled: !!(params.code && params.state),
    retry: false,
  });

  useEffect(() => {
    if (data?.access_token) {
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    }
  }, [data, navigate]);

  return { isLoading, error };
};
