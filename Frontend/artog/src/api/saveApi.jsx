import api from "../api/axios";

const token = sessionStorage.getItem("token");

// Save a drawing
export const saveDrawing = async (drawingId) => {
  const response = await api.post(
    `/save/${drawingId}`,
    {}, // empty body
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// Remove a saved drawing
export const removeSavedDrawing = async (drawingId) => {
  const response = await api.delete(`/save/${drawingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get total number of users who saved a drawing
export const getDrawingSaveCount = async (drawingId) => {
  const response = await api.get(`/save/drawing/${drawingId}/count`);
  return response.data;
};

//  Check if current user has saved this drawing
export const getSaveStatus = async (drawingId) => {
  const response = await api.get(`/save/drawing/${drawingId}/status`);
  return response.data; // { drawingId, isSaved }
};