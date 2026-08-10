import axios from "axios";

const API = axios.create({
  baseURL: "http://65.0.45.209:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Automatically attach JWT token if present in localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
