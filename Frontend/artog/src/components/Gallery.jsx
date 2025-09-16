import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SketchCard from "./SketchCard";
import { getAllSketches } from "../api/SketchApi";

const Gallery = ({ showSubtitle = false }) => {
  const [sketches, setSketches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSketches = async () => {
      try {
        const data = await getAllSketches();
        setSketches(data);
      } catch (err) {
        console.error("Failed to fetch sketches", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSketches();
  }, []);

  if (loading)
    return <p className="text-center text-white mt-10">Loading...</p>;

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <section
        id="gallery"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
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

          {/* Only show subtitle if showSubtitle is true */}
          {showSubtitle && (
            <p className="mt-4 text-lg text-gray-400">
              A collection of my latest anime-inspired artwork.
            </p>
          )}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {sketches.map((sketch) => (
            <SketchCard key={sketch.drawingId} sketch={sketch} />
          ))}
        </div>
      </section>

      <Footer />
      
    </div>
  );
};

export default Gallery;
