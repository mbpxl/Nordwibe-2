import { useMutation } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";
import { clearUserData } from "../../../shared/plugin/clearUserData";
import { redirectToLogin } from "../../../shared/plugin/redirectToLogin";

const logout = async () => {
  const response = await api.post("/auth/logout");
  console.log("method activated...");
  return response.data;
};

export const useLogout = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log("Logout activated");
      clearUserData();
      redirectToLogin();
    },
    onError: (error: any) => {
      console.error("Logout error!", error);
    },
  });

  return { mutate, isPending, isError };
};
