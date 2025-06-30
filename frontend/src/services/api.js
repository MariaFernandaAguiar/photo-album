import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Não autorizado. Redirecionando para login...");
      }
    } else if (error.request) {
      console.error("Sem resposta do servidor.");
    } else {
      console.error("Erro na requisição:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
