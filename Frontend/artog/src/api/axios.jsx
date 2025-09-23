import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44307/api", 
});

//  use JWT authentication:
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
