import { useMutation } from "@tanstack/react-query";
import type {
  ConfirmPhoneRequestTypes,
  ConfirmPhoneResponseTypes,
} from "../types/ConfirmPhoneTypes";
import type { AxiosResponse } from "axios";
import { api } from "../../../shared/plugin/axios";

export const useConfirmPhone = (
  onSuccsess?: (response: ConfirmPhoneResponseTypes) => void,
  onError?: (error: Error) => void
) => {
  const { mutate, data, isError, isPending, error } = useMutation({
    mutationFn: confirmPhone,
    onSuccess: (res) => onSuccsess?.(res.data),
    onError,
  });

  return { mutate, response: data, isError, isPending, error };
};

const confirmPhone = async (
  payload: ConfirmPhoneRequestTypes
): Promise<AxiosResponse<ConfirmPhoneResponseTypes>> => {
  return await api.post("/auth/phone/confirm", payload);
};
