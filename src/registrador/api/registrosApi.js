import axios from "axios";

// TODO: UTILIZAR VARIABLES DE ENTORNO

export const registrosApi = axios.create({
  baseURL: "http://localhost:8000/registros",
});

registrosApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return config;
});
