import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 bg-white text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-14 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img src={Logo} className="w-10 h-10 invert" alt="I-Blog" />
            <h1 className="text-2xl font-bold dark:text-white">I-Blog</h1>
          </Link>

          <p className="text-sm leading-relaxed">
            Sharing insights, tutorials and ideas on web development and tech.
          </p>

          <div className="mt-4 text-sm space-y-1">
            <p>123 Blog St, Style City</p>
            <p>Email: support@iblog.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold dark:text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Blogs", "About Us", "FAQs"].map((item) => (
              <li
                key={item}
                className="hover:text-white transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold dark:text-white mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4 text-2xl">
            <FaFacebook className="hover:text-white transition cursor-pointer" />
            <FaInstagram className="hover:text-white transition cursor-pointer" />
            <FaTwitterSquare className="hover:text-white transition cursor-pointer" />
            <FaPinterest className="hover:text-white transition cursor-pointer" />
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold dark:text-white mb-4">
            Stay in the Loop
          </h3>
          <p className="text-sm mb-4">
            Subscribe to get special offers and updates.
          </p>

          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 rounded-l-md dark:bg-gray-800  text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="px-4 cursor-pointer py-2 bg-red-600 text-white text-sm rounded-r-md hover:bg-red-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-6 text-center text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-red-500 font-medium">I-Blog</span>. Created by Aman. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
