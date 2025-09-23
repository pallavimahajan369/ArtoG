import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import BackgroundMusic from "../components/BackgroundMusic"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(() => {
    const saved = sessionStorage.getItem("autoplayMusic");
    return saved === null ? true : saved === "true";
  });

  const navigate = useNavigate();

  
  useEffect(() => {
    sessionStorage.setItem("autoplayMusic", String(isAutoplayEnabled));
  }, [isAutoplayEnabled]);

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();
    window.addEventListener("loginEvent", checkAuth);
    window.addEventListener("logoutEvent", checkAuth);

    return () => {
      window.removeEventListener("loginEvent", checkAuth);
      window.removeEventListener("logoutEvent", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("logoutEvent"));
    toast.info("Logged out successfully!", {
      autoClose: 2000,
      position: "top-right",
      theme: "dark",
    });
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-sm shadow-lg shadow-orange-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 md:h-28">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="font-bangers text-5xl md:text-6xl text-orange-500 tracking-wider transition-all duration-300 hover:text-orange-400 hover:drop-shadow-[0_0_12px_#F97316]"
              >
                ArtoG
              </Link>
            </div>
            <div className="hidden md:flex items-center ml-12 space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-300 hover:text-orange-500 px-4 py-3 rounded-md text-lg md:text-xl font-semibold transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}

             

              {isLoggedIn ? (
                <div className="relative">
                  <button className="flex items-center focus:outline-none">
                    <FaUserCircle className="h-10 w-10 text-orange-500 hover:text-orange-400 transition-all duration-300" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900/90 backdrop-blur-md rounded-md shadow-lg py-1 ring-1 ring-orange-500/20 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-orange-600/50 hover:text-white transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-orange-600 text-white px-5 py-3 rounded-md text-lg md:text-xl font-semibold hover:bg-orange-500 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-orange-500/50"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

     
      <BackgroundMusic isAutoplayEnabled={isAutoplayEnabled} />

      <ToastContainer />
    </>
  );
};

export default Navbar;
