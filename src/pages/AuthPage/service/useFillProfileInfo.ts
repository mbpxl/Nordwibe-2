import { api } from "../../../shared/plugin/axios";
import type { FillProfileRequest } from "../types/FillProfileTypes";
import { useMutation } from "@tanstack/react-query";

export const useFillProfile = () => {
  const {
    mutate: fillProfile,
    isPending,
    isError,
    isSuccess,
    error,
    data,
  } = useMutation({
    mutationFn: (data: FillProfileRequest) => updateUserProfile(data),
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