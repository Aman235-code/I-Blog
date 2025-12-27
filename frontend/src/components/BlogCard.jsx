import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const date = new Date(blog.createdAt);
  const formateedDate = date.toLocaleDateString("en-GB");
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-gray-800 darl:border-gray-600 p-5 rounded-2xl shadow-lg border hover:scele-105 transition-all">
      <img src={blog.thumbnail} className="rounded-lg" />
      <p className="text-sm mt-2">
        By {blog.author.firstName} | {blog.category} | {formateedDate}
      </p>
      <h2 className="text-xl font-semibold">{blog.title}</h2>
      <h3>{blog.subtitle}</h3>
      <Button
        className={"mt-4 px-4 py-2 rounded-lg text-sm"}
        onClick={() => navigate(`/blogs/${blog._id}`)}
      >
        Read More
      </Button>
    </div>
  );
};

export default BlogCard;
