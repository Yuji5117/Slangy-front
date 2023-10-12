import Axios from "axios";

import { API_URL } from "@/config";

export const clientApi = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "text/plain",
  },
});

clientApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    throw error;
  }
);

clientApi.interceptors.response.use((response) => {
  return response.data;
});
