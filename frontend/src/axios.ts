import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
});

axiosClient.interceptors.request.use((config) => {
  if (localStorage.getItem("access")) {
    config.headers.Authorization = `JWT ${localStorage.getItem("access")}`;
  }
  return config;
});

export default axiosClient;
