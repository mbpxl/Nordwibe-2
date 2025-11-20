// shared/plugin/axios.ts
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

// Переменные для управления процессом обновления токена
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

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

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Если ошибка 401 и это не повторный запрос
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Если уже обновляем токен, добавляем запрос в очередь
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = "Bearer " + token;
            }
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const csrfToken = getCookie("csrftoken");
        const refreshToken = localStorage.getItem("refresh_token");

        // Если нет refresh token, сразу редиректим на логин
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const refreshResponse = await axios.post(
          `${baseURL}auth/refresh_token`,
          {},
          {
            withCredentials: true,
            headers: {
              "X-CSRFToken": csrfToken || "",
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const { access_token, refresh_token } = refreshResponse.data;

        // Сохраняем новые токены
        localStorage.setItem("access_token", access_token);
        if (refresh_token) {
          localStorage.setItem("refresh_token", refresh_token);
        }

        // Обновляем заголовок для оригинального запроса
        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers["Authorization"] = "Bearer " + access_token;

        // Обрабатываем очередь запросов
        processQueue(null, access_token);

        // Повторяем оригинальный запрос
        return api(originalRequest);
      } catch (refreshError) {
        // Ошибка обновления токена - разлогиниваем пользователя
        console.log("Ошибка обновления токена");
        processQueue(refreshError, null);
        clearUserData();
        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Для других ошибок 401 (когда не _retry или нет токена)
    if (error.response?.status === 401) {
      clearUserData();
      redirectToLogin();
    }

    return Promise.reject(error);
  }
);
