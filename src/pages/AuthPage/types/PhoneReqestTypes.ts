export type RequestType = {
  phone: string;
  captcha_token: string;
};

export type ResponseType = {
  type?: string;
  ru_message?: string;
};