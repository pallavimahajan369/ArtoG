import React, { useEffect, useState } from "react";
import SketchCard from "./SketchCard";
import api from "../api/Sketchapi";

const Gallery = () => {
  const [sketches, setSketches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSketches = async () => {
      try {
        const response = await api.get("/sketches");
        setSketches(response.data);
      } catch (err) {
        console.error("Failed to fetch sketches", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSketches();
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <section id="gallery" className="bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-bangers text-5xl md:text-6xl text-orange-400 tracking-wider"
            style={{
              textShadow: `
                0 0 5px #ff9900,
                0 0 10px #ff9900,
                0 0 20px #ff9900,
                0 0 40px #ff6600,
                0 0 80px #ff6600
              `,
            }}
          >
            Sketch Gallery
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            A collection of my latest anime-inspired artwork.
          </p>
        </div>

        {/* Pinterest-style masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {sketches.map((sketch) => (
            <SketchCard key={sketch.drawingId} sketch={sketch} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
