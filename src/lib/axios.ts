import Axios from "axios";

import { API_URL } from "@/config";

export const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    throw error;
  }
);
