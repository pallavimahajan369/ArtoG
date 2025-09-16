import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ import Link

const NavLogo = () => (
  <Link
    to="/#"
    className="font-bangers text-5xl md:text-6xl text-orange-500 tracking-wider transition-all duration-300 hover:text-orange-400 hover:drop-shadow-[0_0_12px_#F97316]"
  >
    ArtoG
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/#" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
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
            <NavLogo />
          </div>
          <div className="hidden md:block">
            <div className="ml-12 flex items-baseline space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path} // ✅ use path here
                  className="text-gray-300 hover:text-orange-500 px-4 py-3 rounded-md text-lg md:text-xl font-semibold transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/login"
                className="bg-orange-600 text-white px-5 py-3 rounded-md text-lg md:text-xl font-semibold hover:bg-orange-500 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-orange-500/50"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-3 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/90" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path} // ✅ path for mobile menu
                className="text-gray-300 hover:text-orange-500 block px-4 py-3 rounded-md text-lg font-semibold transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="bg-orange-600 text-white block px-4 py-3 mx-1 rounded-md text-lg font-semibold hover:bg-orange-500 transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
