import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/plugin/axios";

export const useGetCaptchaToken = () => {
  const {data, isLoading, isError} = useQuery({
    queryKey: ["public-key"],
    queryFn: getPublicKeyCaptcha,
  })
  return {data, isLoading, isError};
}

const getPublicKeyCaptcha = async() => {
  const response = await api.get("/auth/captcha_public_token");
  return response.data;
}