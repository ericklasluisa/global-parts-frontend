import axios from "axios";

// TODO: UTILIZAR VARIABLES DE ENTORNO

export const viajesApi = axios.create({
  baseURL: "http://localhost:8000/finalizarViaje/viajes",
});

viajesApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return config;
});
