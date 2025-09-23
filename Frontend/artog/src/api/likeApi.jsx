// src/api/likeApi.js
import api from "../api/axios";

// Get token from sessionStorage
const token = sessionStorage.getItem("token");

export const likeDrawing = async (drawingId) => {
  const response = await api.post(
    `/like/${drawingId}`,
    {}, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const unlikeDrawing = async (drawingId) => {
  const response = await api.delete(
    `/like/${drawingId}`,
    {}, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Check if current user liked a drawing
export const getLikeStatus = async (drawingId) => {
  const response = await api.get(`/like/drawing/${drawingId}/status`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserLikes = async (userId) => {
  const response = await api.get(`/like/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
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
