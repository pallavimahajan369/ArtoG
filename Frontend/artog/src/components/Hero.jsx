import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import BG from "../images/BG.jpeg";
import naru from "../images/naru.png";

const Hero = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const snowflakePositions = [
    { top: "10%", left: "5%", animation: "animate-[snowfall_25s_linear_infinite]", size: "h-6 w-6" },
    { top: "20%", left: "80%", animation: "animate-[snowfall_20s_linear_infinite_5s]", size: "h-4 w-4" },
    { top: "50%", left: "90%", animation: "animate-[snowfall_15s_linear_infinite_2s]", size: "h-8 w-8" },
    { top: "80%", left: "10%", animation: "animate-[snowfall_22s_linear_infinite_7s]", size: "h-5 w-5" },
    { top: "60%", left: "40%", animation: "animate-[snowfall_18s_linear_infinite]", size: "h-7 w-7" },
    { top: "5%", left: "30%", animation: "animate-[snowfall_28s_linear_infinite_3s]", size: "h-4 w-4" },
    { top: "15%", left: "65%", animation: "animate-[snowfall_19s_linear_infinite_1s]", size: "h-6 w-6" },
    { top: "35%", left: "20%", animation: "animate-[snowfall_26s_linear_infinite_6s]", size: "h-8 w-8" },
    { top: "75%", left: "75%", animation: "animate-[snowfall_16s_linear_infinite_4s]", size: "h-5 w-5" },
    { top: "90%", left: "50%", animation: "animate-[snowfall_23s_linear_infinite_8s]", size: "h-7 w-7" },
    { top: "25%", left: "55%", animation: "animate-[snowfall_17s_linear_infinite_9s]", size: "h-4 w-4" },
    { top: "45%", left: "5%", animation: "animate-[snowfall_24s_linear_infinite_11s]", size: "h-6 w-6" },
  ];

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center text-center overflow-hidden bg-black">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${BG})`, transform: `translateY(${offsetY * 0.4}px)` }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black"></div>

      {/* Snowflakes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {snowflakePositions.map((pos, i) => (
          <div key={i} className={`absolute ${pos.animation}`} style={{ top: pos.top, left: pos.left }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${pos.size} text-white/70`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={0.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L12 22M2 12L22 12M5.636 5.636L18.364 18.364M5.636 18.364L18.364 5.636" />
            </svg>
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="animate-[float_6s_ease-in-out_infinite] mb-6 mt-[50px] hover:scale-105 transition-transform duration-500">
          <img src={naru} alt="Mascot" className="w-5/6 md:w-4/5 lg:w-3/4 max-w-4xl h-auto object-contain drop-shadow-[0_40px_100px_rgba(249,115,22,0.85)]" />
        </div>

        <div className="flex flex-col items-center mt-6">
          <h1 className="font-bangers text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 tracking-wider drop-shadow-lg">ArtoG</h1>
          <p className="mt-5 text-lg md:text-2xl text-gray-300 drop-shadow-sm">
            Discover Stunning Anime Sketches & Illustrations
          </p>
          <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/gallery" 
              className="px-10 py-4 bg-orange-600 text-white font-bold rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-110 hover:bg-orange-500 hover:shadow-orange-500/60"
            >
              Gallery
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
