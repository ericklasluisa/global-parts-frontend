import axios from "axios";

// TODO: UTILIZAR VARIABLES DE ENTORNO

export const authApi = axios.create({
  baseURL: "http://localhost:8000/login",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

//TODO: CONFIGURAR INTERCEPTORES
authApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return config;
});
