import axios from "axios";

// TODO: UTILIZAR VARIABLES DE ENTORNO

export const novedadApi = axios.create({
  baseURL: "http://localhost:8000/novedad",
});

novedadApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return config;
});
