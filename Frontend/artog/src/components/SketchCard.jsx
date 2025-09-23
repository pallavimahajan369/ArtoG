import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegBookmark } from "react-icons/fa";

const SketchCard = ({ sketch }) => {
 
  const imageUrl = `data:image/jpeg;base64,${sketch.imageBase64}`;

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Link to={`/sketch/${sketch.drawingId}`} className="block">
      <div className="relative break-inside-avoid overflow-hidden rounded-2xl shadow-lg group cursor-pointer">
        {/* Image */}
        <img
          src={imageUrl}
          alt={sketch.title}
          className="w-full rounded-2xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Title & Author */}
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <h3 className="text-lg font-bold text-white">{sketch.title}</h3>
          <p className="text-sm text-gray-300">by {sketch.uploadedByName}</p>
        </div>

        {/* Like + Save buttons (only if logged in) */}
        {isLoggedIn && (
          <div className="absolute top-4 right-4 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 rounded-full bg-black/50 text-white hover:text-red-500 hover:bg-white/20 transition-colors duration-200">
              <FaHeart className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full bg-black/50 text-white hover:text-orange-400 hover:bg-white/20 transition-colors duration-200">
              <FaRegBookmark className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default SketchCard;
