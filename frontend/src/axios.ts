import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/`,
});

axiosClient.interceptors.request.use((config) => {
  if (localStorage.getItem("access")) {
    config.headers.Authorization = `JWT ${localStorage.getItem("access")}`;
  }
  console.log(config.headers);
  return config;
});

export default axiosClient;
