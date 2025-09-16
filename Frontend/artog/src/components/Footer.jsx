import React from 'react';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-orange-500/20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* About */}
          <div>
            <h3 className="text-orange-500 text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-400 text-sm">
              ArtoG is an anime-inspired sketch gallery showcasing creative artwork and designs. Follow us for the latest sketches and updates!
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-orange-500 text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-orange-500 text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">Email: <a href="mailto:artog@example.com" className="hover:text-white">artog@example.com</a></p>
            <p className="text-gray-400 text-sm">Phone: <a href="tel:+1234567890" className="hover:text-white">+1 234 567 890</a></p>

            {/* Social Icons */}
            <div className="flex mt-4 space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-transform transform hover:scale-110 duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/pallavi_utr?utm_source=qr&igsh=bzQxNXN0emUyNTgz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-transform transform hover:scale-110 duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-transform transform hover:scale-110 duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="h-6 w-6" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ArtoG. All Rights Reserved. 
          <span className="block mt-1 text-gray-400">Inspired by the way of the ninja.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
