// Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registerUser } from "../api/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await registerUser(formData);
      console.log("Signup success:", data);

      toast.success("Account created successfully! 🎉", {
        autoClose: 2000,
        position: "top-right",
        theme: "dark",
      });

      // Redirect to login after a short delay
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);

      toast.error(error.response?.data?.message || "Signup failed. Try again.", {
        autoClose: 2000,
        position: "top-right",
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pt-24 pb-12 bg-black">
        <div className="max-w-md w-full mx-auto p-8 bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg space-y-6 border border-gray-700">
          <div className="text-center">
            <h1 className="font-bangers text-5xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 tracking-wider">
              Join ArtoG
            </h1>
            <p className="mt-2 text-gray-400">
              Create an account to join the community.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                type="text"
                id="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Choose a username"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Create a strong password"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-3 bg-orange-600 text-white font-bold rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-orange-500 hover:shadow-orange-500/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-500"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-orange-500 hover:text-orange-400">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Signup;
