import React from "react";
import { FaHeart, FaRegBookmark } from "react-icons/fa";

const SketchCard = ({ sketch }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg bg-gray-800 border-2 border-transparent hover:border-orange-500/50 transition-all duration-300 aspect-square">
      <img
        src={sketch.imageUrl}
        alt={sketch.title}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-lg font-bold text-white">{sketch.title}</h3>
        <p className="text-sm text-gray-300">by {sketch.artist}</p>
      </div>
      <div className="absolute top-4 right-4 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-2 rounded-full bg-black/50 text-white hover:text-red-500 hover:bg-white/20 transition-colors duration-200">
          <FaHeart className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full bg-black/50 text-white hover:text-orange-400 hover:bg-white/20 transition-colors duration-200">
          <FaRegBookmark className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SketchCard;
