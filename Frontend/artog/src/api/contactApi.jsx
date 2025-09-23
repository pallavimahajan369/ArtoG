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
