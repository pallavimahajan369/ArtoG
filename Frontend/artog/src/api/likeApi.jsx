// src/api/likeApi.js
import api from "../api/axios";

export const likeDrawing = async (drawingId) => {
  const response = await api.post(`/like/${drawingId}`);
  return response.data;
};

export const unlikeDrawing = async (drawingId) => {
  const response = await api.delete(`/like/${drawingId}`);
  return response.data;
};

export const getUserLikes = async (userId) => {
  const response = await api.get(`/like/user/${userId}`);
  return response.data;
};

export const getLikeCount = async (drawingId) => {
  const response = await api.get(`/like/count/${drawingId}`);
  return response.data;
};

export const getLikesForDrawing = async (drawingId) => {
  const response = await api.get(`/like/drawing/${drawingId}`);
  return response.data;
};

export const getLikesSummary = async () => {
  const response = await api.get(`/like/summary`);
  return response.data;
};
