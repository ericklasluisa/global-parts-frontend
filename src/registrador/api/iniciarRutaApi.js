import axios from "axios";

// TODO: UTILIZAR VARIABLES DE ENTORNO

export const iniciarRutaApi = axios.create({
  baseURL: "http://localhost:8000/iniciarRuta",
});

iniciarRutaApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return config;
});
