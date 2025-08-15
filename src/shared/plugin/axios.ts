import axios from "axios";
import { getCookie } from "./getCookie";


export const api = axios.create({
  baseURL: "https://3133319-bo35045.twc1.net/api/v2",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  const csrfToken = getCookie("csrftoken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }

  return config;
});
