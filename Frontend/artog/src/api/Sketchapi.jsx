// src/api/sketchApi.js
import api from "./axios"; // your axios instance

// User endpoints
export const getAllSketches = async () => {
  const response = await api.get("/sketches");
  return response.data;
};

export const getSketchById = async (id) => {
  const response = await api.get(`/sketches/${id}`);
  return response.data;
};

// Admin endpoints
export const getAllSketchesAdmin = async () => {
  const response = await api.get("/sketches/admin/all");
  return response.data;
};

export const getSketchByIdAdmin = async (id) => {
  const response = await api.get(`/sketches/admin/${id}`);
  return response.data;
};

export const getSketchesByAdmin = async (adminId) => {
  const response = await api.get(`/sketches/admin/byuser/${adminId}`);
  return response.data;
};

export const createSketch = async (formData) => {
  // formData = FormData object with { title, description, imageFile }
  const response = await api.post("/sketches", formData);
  return response.data;
};

export const updateSketch = async (id, formData) => {
  const token = sessionStorage.getItem("token");

  const response = await api.put(`/sketches/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const softDeleteSketch = async (id) => {
  const token = sessionStorage.getItem("token"); // wherever you store JWT
  const response = await api.delete(`/sketches/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    "Content-Type": "multipart/form-data",
  });
  return response.data;
};

export const restoreSketch = async (id) => {
  const token = sessionStorage.getItem("token");
  const response = await api.post(`/sketches/restore/${id}`, null, {
    headers: { Authorization: `Bearer ${token}` },
    "Content-Type": "multipart/form-data",
  });
  return response.data;
};
