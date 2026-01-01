import React, { useEffect } from "react";
import blogImg from "../assets/blog.jpg";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            About Our Blog
          </h1>
          <p className="text-center text-base sm:text-lg text-gray-600 dark:text-gray-300">
            A place to share thoughts, inspire others, and grow together.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={blogImg}
              alt="Blog Illustration"
              className="w-full max-w-md h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Text */}
          <div className="text-justify text-base sm:text-lg text-gray-700 dark:text-gray-200 space-y-5">
            <p>
              Welcome to our IBlog App. We created this platform for readers,
              writers, and thinkers to connect through stories, tutorials, and
              creative insights. Whether you're a passionate blogger or someone
              who loves reading, this space is built for you.
            </p>

            <p>
              Our mission is to empower individuals to express themselves
              freely. We offer simple tools to write, publish, and engage with
              others in meaningful ways.
            </p>

            <p>Thank you for being a part of our growing community.</p>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center">
          <blockquote className="text-xl sm:text-2xl italic text-gray-500 max-w-3xl mx-auto">
            “Words are powerful. Use them to inspire.”
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default About;
