// src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import { getUserDetails, getUserSavedDrawings } from "../api/userApi"; // ✅ use userApi.js

function ArtCard({ src, title }) {
  return (
    <div className="group relative overflow-hidden rounded-lg cursor-pointer">
      <img
        src={src}
        alt={title}
        className="w-full h-auto object-cover aspect-[3/4] transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <h3 className="text-lg font-bold text-white drop-shadow-md">{title}</h3>
      </div>
    </div>
  );
}

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [savedArtworks, setSavedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👤 Get logged-in userId and token
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        //  Get user details
        const userData = await getUserDetails(userId);
        setUser(userData);
        console.log("User:", userData);
        //  Get saved artworks
        const savedData = await getUserSavedDrawings(userId);
        setSavedArtworks(savedData);
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Profile Header */}
        <div className="pt-16 pb-8 text-center">
          <img
            src={user.avatar || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-32 h-32 md:w-36 md:h-36 mx-auto rounded-full object-cover border-4 border-gray-800 shadow-lg"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">
            {user.username}
          </h1>
          <p className="text-gray-400">{user.email}</p>
          <button className="mt-4 px-5 py-2 bg-gray-700 text-white text-sm font-bold rounded-lg shadow-md transition-all duration-300 hover:bg-gray-600 hover:scale-105">
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-center border-y border-gray-700/50 py-4">
          <div className="text-center">
            <p className="font-bold text-xl">{savedArtworks.length}</p>
            <p className="text-sm text-gray-400">Saved</p>
          </div>
        </div>

        {/* Saved Artworks */}
        <div className="mt-8">
          {savedArtworks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {savedArtworks.map((art) => (
                <ArtCard
                  key={art.drawingId}
                  src={`data:image/jpeg;base64,${art.imageData}`}
                  title={art.title}
                />
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
