import api from "../api/axios";

// Save a drawing
export const saveDrawing = async (drawingId) => {
  const response = await api.post(`/save/${drawingId}`);
  return response.data;
};

// Remove a saved drawing
export const removeSavedDrawing = async (drawingId) => {
  const response = await api.delete(`/save/${drawingId}`);
  return response.data;
};

// Get all saved drawings of a user
export const getUserSaves = async (userId) => {
  const response = await api.get(`/save/user/${userId}`);
  return response.data;
};
