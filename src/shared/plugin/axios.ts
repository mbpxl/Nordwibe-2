import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { getCookie } from "./getCookie";
import { redirectToLogin } from "./redirectToLogin";
import { clearUserData } from "./clearUserData";

const baseURL = "https://nordwibe.com/api/v2/";

export const baseURLforImages = "https://nordwibe.com/";

export const api = axios.create({
  baseURL,
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

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // Запрос на обновление токена
          const csrfToken = getCookie("csrftoken");
          const refreshResponse = await axios.post(
            `${baseURL}auth/refresh_token`,
            {},
            {
              withCredentials: true,
              headers: {
                "X-CSRFToken": csrfToken || "",
                Authorization: `Bearer ${localStorage.getItem(
                  "refresh_token"
                )}`,
              },
            }
          );

          const { access_token, refresh_token } = refreshResponse.data;

          localStorage.setItem("access_token", access_token);
          if (refresh_token) {
            localStorage.setItem("refresh_token", refresh_token);
          }

          if (!originalRequest.headers) originalRequest.headers = {};
          originalRequest.headers["Authorization"] = "Bearer " + access_token;

          return api(originalRequest);
        } catch (err) {
          console.log("Пизда ебаная с токеном");
          clearUserData();
          redirectToLogin();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      } else {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
