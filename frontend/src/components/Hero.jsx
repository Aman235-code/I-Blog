import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Blog from "../assets/blog2.png";

const Hero = () => {
  return (
    <section className="px-4 md:px-0">
      <div className="max-w-7xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col-reverse md:flex-row items-center justify-center gap-10">
        
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Explore the Latest Tech <br className="hidden md:block" />
            & Web Trends
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto md:mx-0">
            Stay ahead with in-depth articles, tutorials, and insights on web
            development, digital marketing, and tech innovations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/dashboard/write-blog">
              <Button size="lg" className="w-full sm:w-auto cursor-pointer">
                Get Started
              </Button>
            </Link>

            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto cursor-pointer"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={Blog}
            alt="Blog illustration"
            className="w-[90%] sm:w-[70%] md:w-full max-w-md md:max-w-xl object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
