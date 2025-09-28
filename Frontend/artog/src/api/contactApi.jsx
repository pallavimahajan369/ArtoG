// src/api/contactApi.js
import api from "./axios"; 

// POST a new contact message
export const sendMessage = async (messageData) => {
  try {
    const response = await api.post("/contact", messageData);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// GET all contact messages
export const getMessages = async () => {
  try {
    const response = await api.get("/contact");
    return response.data;
    
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

// DELETE a contact message by ID
export const deleteMessage = async (id) => {
  try {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting message with id ${id}:`, error);
    throw error;
  }
};

//  UPDATE message status (New → Read)
export const updateMessageStatus = async (id, status) => {
  try {
    const response = await api.put(`/contact/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating status for message with id ${id}:`, error);
    throw error;
  }
};