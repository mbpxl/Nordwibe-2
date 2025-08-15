export type ConfirmPhoneRequestTypes = {
  phone: string;
  code: string;
  captcha_token: string;
}

export type ConfirmPhoneResponseTypes = {
  type: string;
  ru_message: string;
}