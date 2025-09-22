import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loginUser } from "../api/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = await loginUser({ email, password }); // backend returns { token, userId, role }

    if (!data?.token) {
      throw new Error("No token received from server");
    }

    // Store in sessionStorage
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("userId", data.userId);
    sessionStorage.setItem("role", data.role);

    // Fire login event for Navbar
    window.dispatchEvent(new Event("loginEvent"));

    // Show success toast
    toast.success("Login successful!", {
      autoClose: 1500,
      position: "top-right",
      theme: "dark",
    });

    // Redirect based on role
    setTimeout(() => {
      if (data.role === "Admin") {
        navigate("/admin/dashboard"); // admin dashboard route
      } else {
        navigate("/"); // normal user home page
      }
    }, 1500);

  } catch (error) {
    console.error("Login error:", error);

    toast.error("Login failed. Try again.", {
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
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 bg-black">
        <Navbar />

        <div className="max-w-md w-full mx-auto p-8 bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg space-y-6 border border-gray-700">
          <div className="text-center">
            <h1 className="font-bangers text-5xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 tracking-wider">
              Welcome Back
            </h1>
            <p className="mt-2 text-gray-400">Sign in to continue to ArtoG.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Your Password"
                className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-8 py-3 bg-orange-600 text-white font-bold rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-orange-500 hover:shadow-orange-500/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-500 ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-400">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-medium text-orange-500 hover:text-orange-400"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>

      <Footer />
      {/* ✅ Toast for this page */}
      <ToastContainer />
    </>
  );
};

export default Login;
