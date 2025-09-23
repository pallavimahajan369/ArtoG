// commentApi.js
import api from "../api/axios"; 
// Get all comments for a drawing
export const getComments = async (drawingId) => {
  try {
    const response = await api.get(`/comment/drawing/${drawingId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

// Post a comment on a drawing
export const postComment = async (drawingId, commentData) => {
  try {
    const response = await api.post(`/comment/drawing/${drawingId}`, commentData);
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (commentId) => {
  try {
    await api.delete(`/comment/${commentId}`);
    return true;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
