// * POST метод для отправки регистрации/входа по номеру телефоне

import { useMutation } from "@tanstack/react-query"
import type { RequestType } from "../types/PhoneReqestTypes";
import { api } from "../../../shared/plugin/axios";

export const usePhoneRequest = (
  onSuccess?: (response: ResponseType) => void,
  onError?: (error: unknown) => void
) => {
  const {mutate, data, isError, isPending} = useMutation({
    mutationFn: postPhoneRequest,
    onSuccess: (res) => onSuccess?.(res.data!),
    onError,
  });

  return { sendPhoneRequest: mutate, response: data, isError, isPending };
};

const postPhoneRequest = async (
  payload: RequestType
) => {
  return await api.post("/auth/phone/request", payload);
};