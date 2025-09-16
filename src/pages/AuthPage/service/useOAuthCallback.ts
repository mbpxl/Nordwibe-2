import { useMutation } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

interface OAuth2CallbackParams {
  code: string;
  state: string;
  type?: string;
  device_id?: string;
}

export const useOAuth2Callback = () => {
  return useMutation({
    mutationFn: async (params: OAuth2CallbackParams) => {
      const queryParams = new URLSearchParams({
        code: params.code,
        state: params.state,
        ...(params.type && { type: params.type }),
        ...(params.device_id && { device_id: params.device_id }),
      });

      const response = await api.get(
        `/auth/oauth2/callback?${queryParams.toString()}`
      );
      return response.data;
    },
  });
};
