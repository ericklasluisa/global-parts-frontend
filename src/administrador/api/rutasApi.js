import axios from "axios";

// TODO: UTILIZAR VARIABLES DE ENTORNO

export const rutasApi = axios.create({
  baseURL: "http://localhost:8000/rutas",
});

rutasApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return config;
});