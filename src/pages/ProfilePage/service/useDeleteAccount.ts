import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../../shared/plugin/axios";

export const useDeleteAccount = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.delete("/user/me");
      return data;
    },
    onSuccess: () => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
      window.location.reload();
    },
    onError: (error) => {
      console.error("Ошибка при удалении аккаунта:", error);
      alert("Не удалось удалить аккаунт. Попробуйте позже.");
    },
  });
};
