import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

const About = () => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden py-24 flex items-center justify-center">
      {/* Background overlay */}
        <Navbar />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-gray-900/50 to-black opacity-80"></div>

      {/* ❄ Snowflakes ❄ */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {snowflakePositions.map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos.animation}`}
            style={{ top: pos.top, left: pos.left }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${pos.size} text-white/70`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={0.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2L12 22M2 12L22 12M5.636 5.636L18.364 18.364M5.636 18.364L18.364 5.636"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-6 text-center">
        <header className="mb-16">
          <h1 className="font-bangers text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 tracking-wider drop-shadow-lg">
            About ArtoG
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            A hidden village of art, where anime flows like chakra and every stroke is a warrior’s spirit.
          </p>
        </header>

        <section className="mb-20 bg-gray-900/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-orange-500/20 max-w-4xl mx-auto">
          <h2 className="font-bangers text-4xl text-orange-400 mb-4 tracking-wide">
            Our Story
          </h2>
          <p className="text-gray-300 leading-relaxed text-left">
            ArtoG was born from a simple idea: to build a premier platform
            exclusively for the vibrant and diverse world of anime and manga
            art. We saw countless talented artists whose work deserved a bigger
            spotlight and a community that was hungry for high-quality, original
            illustrations. Our mission is to bridge that gap, providing tools
            for artists to showcase their portfolios, connect with fans, and
            find new opportunities. For enthusiasts, ArtoG is a universe of
            endless inspiration, a place to discover new styles, follow favorite
            creators, and celebrate the artistry of anime.
          </p>
        </section>
<Footer />        
      </main>

      {/* Keyframes */}
      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
       
    </div>
    
  );
};

export default About;
