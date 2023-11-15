import Axios, { InternalAxiosRequestConfig } from "axios";

import { API_URL } from "@/config";
import { storage } from "@/utils/storage";

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }

  config.headers.Accept = "application/json";
  return config;
};

export const clientApi = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "text/plain",
  },
});

clientApi.interceptors.request.use(authRequestInterceptor);
clientApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
