// src/api/userApi.js
import api from "../api/axios";

export const getUserDetails = async (userId) => {
  const response = await api.get(`/user/${userId}`);
  return response.data;
};

export const getUserSavedDrawings = async (userId) => {
  const response = await api.get(`/user/${userId}/saved`);
  return response.data;
};

export const getUserLikedDrawings = async (userId) => {
  const response = await api.get(`/user/${userId}/liked`);
  return response.data;
};
