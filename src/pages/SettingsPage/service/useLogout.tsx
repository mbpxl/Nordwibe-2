import { useMutation } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";
import { clearUserData } from "../../../shared/plugin/clearUserData";
import { redirectToLogin } from "../../../shared/plugin/redirectToLogin";
import { useRedirectAfterLogin } from "../../../shared/hooks/useRedirectAfterLogin";

const logout = async () => {
  const response = await api.post("/auth/logout");
  console.log("method activated...");
  return response.data;
};

export const useLogout = () => {
  const { setManualLogout } = useRedirectAfterLogin();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.dispatchEvent(
        new CustomEvent("authChange", {
          detail: { isAuthenticated: false },
        })
      );
      clearUserData();
      setManualLogout();
      redirectToLogin();
    },
    onError: (error: any) => {
      console.error("Logout error!", error);
    },
  });

  return { mutate, isPending, isError };
};
