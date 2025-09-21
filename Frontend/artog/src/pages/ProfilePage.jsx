// src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import { getUserDetails, getUserSavedDrawings } from "../api/userApi";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import SketchCard from "../components/SketchCard"; // ✅ import your new card

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [savedArtworks, setSavedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  
  useEffect(() => {
  if (!userId) return;

  const fetchData = async () => {
    try {
      const userData = await getUserDetails(userId);
      setUser(userData);

      const savedData = await getUserSavedDrawings(userId);

      // ✅ Normalize savedData to match SketchCard props
      const normalizedArtworks = savedData.map((art) => ({
        ...art,
        imageBase64: art.imageData, // map imageData -> imageBase64
        uploadedByName: art.uploadedByName || userData.username, // fallback to current user
      }));

      setSavedArtworks(normalizedArtworks);
    } catch (err) {
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [userId]);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        No user found. Please log in.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Profile Header */}
        <div className="pt-16 pb-8 text-center">
          <img
            src="https://api.dicebear.com/7.x/bottts/svg?seed=artog"
            alt="User Avatar"
            className="w-32 h-32 md:w-36 md:h-36 mx-auto rounded-full object-cover border-4 border-gray-800 shadow-lg mt-12"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">
            {user.username}
          </h1>
          <p className="text-gray-400">{user.email}</p>
          <Link
            to="/edit-profile"
            className="mt-4 px-5 py-2 bg-gray-700 text-white text-sm font-bold rounded-lg shadow-md transition-all duration-300 hover:bg-gray-600 hover:scale-105 inline-block"
          >
            Edit Profile
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center border-y border-gray-700/50 py-4">
          <div className="text-center">
            <p className="font-bold text-xl text-orange-400">
              {savedArtworks.length}
            </p>
            <p className="text-sm text-gray-400">Saved</p>
          </div>
        </div>

        {/* Saved Artworks */}
        <div className="mt-8">
          {savedArtworks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {savedArtworks.map((sketch) => (
                <SketchCard key={sketch.drawingId} sketch={sketch} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-white">
                No Saved Posts
              </h3>
              <p className="text-gray-500 mt-2">
                You haven't saved any posts yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
