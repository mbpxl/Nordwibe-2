import { useMutation } from "@tanstack/react-query";
import { getCookie } from "../plugin/getCookie";
import { api } from "../plugin/axios";

export const useAccessToken = () => {
  return useMutation({ mutationFn: fetchAccessToken });
};

export const fetchAccessToken = async(): Promise<string> => {
  const csrfToken = getCookie("csrfToken");

  const response = await api.post(
    "/auth/refresh_token",
    {
        headers: {
        "X-CSRFToken": csrfToken ?? "",
      },
    },
  );

  const accessToken = response.data?.access_token;
  if(!accessToken) throw new Error("Access token не получен");

  localStorage.setItem("access_token", accessToken);
  return accessToken;
};
