import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Blog from "../assets/blog2.png";

const Hero = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 md:px-0">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="max-w-7xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col-reverse md:flex-row items-center justify-center gap-12">
        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
            Explore the Latest Tech
            <span className="block text-purple-500"> & Web Trends</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-xl mx-auto md:mx-0">
            Stay ahead with in-depth articles, practical tutorials, and
            real-world insights on web development and
            modern tech.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/dashboard/write-blog">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 shadow-lg shadow-purple-500/20"
              >
                Get Started
              </Button>
            </Link>

            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="relative">
            {/* Image glow */}
            <div className="absolute inset-0 rounded-3xl bg-purple-500/10 blur-2xl scale-110" />

            <img
              src={Blog}
              alt="Blog illustration"
              className="relative rounded-2xl w-[90%] sm:w-[70%] md:w-full max-w-md md:max-w-xl object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
