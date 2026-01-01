import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, Tag, User } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB");
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <User size={14} />
            {blog.author.firstName}
          </span>
          <span className="flex items-center gap-1">
            <Tag size={14} />
            {blog.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold leading-snug line-clamp-2">
          {blog.title}
        </h2>

        {/* Subtitle */}
        {blog.subtitle && (
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {blog.subtitle}
          </p>
        )}

        {/* Button */}
        <Button
          variant="outline"
          className="mt-2 w-fit cursor-pointer"
          onClick={() => {
            if (user) {
              navigate(`/blogs/${blog._id}`);
            } else {
              toast.error("Please Login to view this blog");
            }
          }}
        >
          Read More
        </Button>
      </div>
    </div>
  );
};

export default BlogCard;
