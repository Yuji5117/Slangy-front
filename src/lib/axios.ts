import Axios from "axios";

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
