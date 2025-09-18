import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import BackgroundMusic from "../components/BackgroundMusic";
import SketchCard from "../components/SketchCard";
import Footer from "../components/Footer";

const Home = () => {
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(() => {
    const savedPreference = localStorage.getItem("autoplayMusic");
    // Default to true if no preference is saved
    return savedPreference !== "true";
  });

  useEffect(() => {
    localStorage.setItem("autoplayMusic", String(isAutoplayEnabled));
  }, [isAutoplayEnabled]);

  const toggleAutoplay = () => {
    setIsAutoplayEnabled((prev) => !prev);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Gallery limit={8} showSubtitle={true} />

      </main>
     
      <BackgroundMusic isAutoplayEnabled={isAutoplayEnabled} />
    </div>
  );
};

export default Home;