import axios from "axios";

export const dashboardAPI = axios.create({
    baseURL: 'http://localhost:8000/dashboard',
})

dashboardAPI.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    return config;
});
