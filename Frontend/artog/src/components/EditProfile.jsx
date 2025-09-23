// src/pages/EditProfilePage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails, updateUser } from "../api/userApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        toast.error("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const user = await getUserDetails(userId);
        setFormData({
          name: user.username,
          email: user.email,
        });
      } catch (error) {
        console.error("Error fetching user:", error.message);
        toast.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const updatedUser = {
        username: formData.name,
        email: formData.email,
      };

      await updateUser(userId, updatedUser); 
      toast.success("Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      console.error("Error updating user:", error.message);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <div className="text-center text-white py-20">Loading...</div>;

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-5xl font-bangers text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 tracking-wider mb-12 drop-shadow-lg">
          Edit Your Profile
        </h1>

        <form onSubmit={handleSaveChanges} className="bg-gray-800/50 p-8 rounded-xl shadow-2xl space-y-8">
          {/* Avatar (frontend-only) */}
          <div className="flex flex-col items-center space-y-4">
            <img
              src="https://api.dicebear.com/7.x/bottts/svg?seed=artog"
              alt="User Avatar"
              className="w-32 h-32 md:w-36 md:h-36 mx-auto rounded-full object-cover border-4 border-gray-800 shadow-lg"
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white rounded-md border-gray-600 focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white rounded-md border-gray-600 focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition"
              placeholder="your.email@example.com"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <Link
              to="/profile"
              className="px-6 py-2 bg-gray-600 text-white font-bold rounded-lg shadow-md transition-all duration-300 hover:bg-gray-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-500 hover:shadow-orange-500/60"
            >
              Save Changes
            </button>
          </div>
        </form>

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
};

export default EditProfilePage;
