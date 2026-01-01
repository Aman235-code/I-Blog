import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const BlogCardList = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Thumbnail */}
        <div className="md:w-1/3 w-full overflow-hidden">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-52 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-5 md:p-6 md:w-2/3">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
              {blog.title}
            </h2>

            {blog.subtitle && (
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                {blog.subtitle}
              </p>
            )}
          </div>

          <div className="mt-4">
            <Button
              variant="outline"
              className="rounded-full px-5 py-2 text-sm cursor-pointer"
              onClick={() => navigate(`/blogs/${blog._id}`)}
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardList;
