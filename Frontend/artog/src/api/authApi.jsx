// src/api/authApi.js
import api from "./axios";

export const registerUser = async (userData) => {
  // userData = { username, email, password }
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  // credentials = { email, password }
  const response = await api.post("/auth/login", credentials);
  return response.data; // returns { token, userId, role }
};
