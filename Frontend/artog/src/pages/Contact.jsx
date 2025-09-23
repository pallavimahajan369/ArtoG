import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { sendMessage } from "../api/contactApi"; //
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const snowflakePositions = [
  {
    top: "10%",
    left: "5%",
    animation: "animate-[snowfall_25s_linear_infinite]",
    size: "h-6 w-6",
  },
  {
    top: "20%",
    left: "80%",
    animation: "animate-[snowfall_20s_linear_infinite_5s]",
    size: "h-4 w-4",
  },
  {
    top: "50%",
    left: "90%",
    animation: "animate-[snowfall_15s_linear_infinite_2s]",
    size: "h-8 w-8",
  },
  {
    top: "80%",
    left: "10%",
    animation: "animate-[snowfall_22s_linear_infinite_7s]",
    size: "h-5 w-5",
  },
  {
    top: "60%",
    left: "40%",
    animation: "animate-[snowfall_18s_linear_infinite]",
    size: "h-7 w-7",
  },
  {
    top: "5%",
    left: "30%",
    animation: "animate-[snowfall_28s_linear_infinite_3s]",
    size: "h-4 w-4",
  },
  {
    top: "15%",
    left: "65%",
    animation: "animate-[snowfall_19s_linear_infinite_1s]",
    size: "h-6 w-6",
  },
  {
    top: "35%",
    left: "20%",
    animation: "animate-[snowfall_26s_linear_infinite_6s]",
    size: "h-8 w-8",
  },
  {
    top: "75%",
    left: "75%",
    animation: "animate-[snowfall_16s_linear_infinite_4s]",
    size: "h-5 w-5",
  },
  {
    top: "90%",
    left: "50%",
    animation: "animate-[snowfall_23s_linear_infinite_8s]",
    size: "h-7 w-7",
  },
  {
    top: "25%",
    left: "55%",
    animation: "animate-[snowfall_17s_linear_infinite_9s]",
    size: "h-4 w-4",
  },
  {
    top: "45%",
    left: "5%",
    animation: "animate-[snowfall_24s_linear_infinite_11s]",
    size: "h-6 w-6",
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendMessage(form);

      toast.success(res.message || "Message sent successfully!", {
        position: "top-right",
        autoClose: 4000, // 4 seconds
        hideProgressBar: false, // show progress bar
        closeOnClick: true, // close on click
        pauseOnHover: true, // pause on hover
        draggable: true, // allow drag
        theme: "dark", // dark theme
        icon: "✅", // add a checkmark icon
      });

      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to send message. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          icon: "⚠️",
        }
      );

      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col">
      <Navbar />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-gray-900/50 to-black opacity-80"></div>

      {/*  Snowflakes  */}
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

      <main className="relative z-10 flex-grow container mx-auto px-6 text-center flex flex-col justify-center">
        <header className="mb-12 mt-28">
          <h1 className="font-bangers text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 tracking-wider drop-shadow-lg">
            Get In Touch
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Have a question, suggestion, or just want to say hello? Drop us a
            line!
          </p>
        </header>

        <section className="bg-gray-900/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-orange-500/20 max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center text-lg">
              <h2 className="font-bangers text-3xl text-orange-400 mb-4">
                Thank You!
              </h2>
              <p className="text-gray-300">
                Your message has been sent. We'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              ></textarea>
              <button
                type="submit"
                className="w-full px-10 py-4 bg-orange-600 text-white font-bold rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105 hover:bg-orange-500 hover:shadow-orange-500/60"
              >
                Send Message
              </button>
            </form>
          )}
        </section>

        <Footer />
      </main>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

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

export default Contact;
