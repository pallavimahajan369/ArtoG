import React from 'react';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = ({ isAutoplayEnabled, onToggleAutoplay }) => {
  return (
    <footer className="bg-black border-t border-orange-500/20 text-gray-400">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Autoplay Toggle */}
        <div className="flex justify-center items-center mb-8">
          <label htmlFor="autoplay-toggle" className="mr-3 text-sm font-medium">
            Autoplay Music
          </label>
          <button
            id="autoplay-toggle"
            role="switch"
            aria-checked={isAutoplayEnabled}
            onClick={onToggleAutoplay}
            className={`${
              isAutoplayEnabled ? 'bg-orange-600' : 'bg-gray-600'
            } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black`}
          >
            <span
              aria-hidden="true"
              className={`${
                isAutoplayEnabled ? 'translate-x-5' : 'translate-x-0'
              } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
          >
            <span className="sr-only">Twitter</span>
            <FaTwitter className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
          >
            <span className="sr-only">Instagram</span>
            <FaInstagram className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-orange-500 transition-colors duration-300"
          >
            <span className="sr-only">Facebook</span>
            <FaFacebook className="h-6 w-6" />
          </a>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex justify-center space-x-4 text-sm">
          <a href="#" className="hover:text-white">Terms of Service</a>
          <span>|</span>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>

        {/* Copyright */}
        <p className="mt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} ArtoG. All Rights Reserved. Inspired by the way of the ninja.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
