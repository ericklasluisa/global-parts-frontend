import axios from "axios";

// TODO: UTILIZAR VARIABLES DE ENTORNO

export const finalizarRutaApi = axios.create({
  baseURL: "http://localhost:8000/finalizarRuta/recolecciones",
});

finalizarRutaApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return config;
});
