// src/api/userApi.js
import api from "../api/axios";

//  Get user details
export const getUserDetails = async (userId) => {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");

  const response = await api.get(`/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

//  Get saved drawings of user
export const getUserSavedDrawings = async (userId) => {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");

  const response = await api.get(`/user/${userId}/saved`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

//  Get liked drawings of user
export const getUserLikedDrawings = async (userId) => {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");

  const response = await api.get(`/user/${userId}/liked`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

//  Update user

export const updateUser = async (userId, updatedUser) => {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");

  const response = await api.patch(`/user/${userId}`, updatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

//  Delete user (soft delete)
export const deleteUser = async (userId) => {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");

  const response = await api.delete(`/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getAllUsers = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");

  const response = await api.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

//  Restore user
export const restoreUser = async (userId) => {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("User is not logged in");

  const response = await api.patch(`/user/${userId}/restore`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
