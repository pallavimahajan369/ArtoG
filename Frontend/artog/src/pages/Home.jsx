import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";

const Home = () => {
  
  return (
    <div className="bg-gray-900 text-white min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Gallery limit={8} showSubtitle={true} />

      </main>
     
      
    </div>
  );
};

export default Home;