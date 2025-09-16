// src/pages/Gallery.jsx
import React, { useEffect, useState } from "react";
import api from "../api/Sketchapi"; // axios instance we created earlier

function Gallery() {
  const [sketches, setSketches] = useState([]);

  useEffect(() => {
    api
      .get("/sketches") // GET from backend
      .then((res) => setSketches(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-900">
        🎨 Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sketches.map((s) => (
          <div
            key={s.sketchId}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-4"
          >
            <img
              src={s.imageUrl || "https://via.placeholder.com/300"} // fallback
              alt={s.title}
              className="rounded-lg w-full h-64 object-cover mb-3"
            />
            <h2 className="text-lg font-semibold text-gray-800">{s.title}</h2>
            <p className="text-sm text-gray-600">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
