import { api } from "../plugin/axios";
import type { FillProfileRequest } from "../../pages/AuthPage/types/FillProfileTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFillProfile = () => {
	const queryClient = useQueryClient();
  const {
    mutate: fillProfile,
    isPending,
    isError,
    isSuccess,
    error,
    data,
  } = useMutation({
    mutationFn: (data: FillProfileRequest) => updateUserProfile(data),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ["get-me"]});
		}
  });

  return {
    fillProfile,
    isPending,
    isError,
    isSuccess,
    error,
    data,
  };
};


const updateUserProfile = async(data: FillProfileRequest) => {
  const response = await api.put("/user/me", data);
  return response;
}