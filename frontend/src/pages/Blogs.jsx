/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import BlogCard from "../components/BlogCard";
import { setBlog } from "../redux/blogSlice";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getAllPublishedBlogs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/blog/get-published-blogs`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    getAllPublishedBlogs();
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Explore Our Blogs
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover stories, tutorials, and insights shared by our community.
          Learn, grow, and stay inspired.
        </p>
        <hr className="w-24 mt-6 border-2 border-red-500 rounded-full mx-auto" />
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 md:px-0 pb-16">
        {blog?.length > 0 ? (
          blog.map((item, index) => <BlogCard blog={item} key={index} />)
        ) : (
          <div className="col-span-full text-center py-20">
            <h2 className="text-xl font-semibold mb-2">
              No blogs published yet
            </h2>
            <p className="text-gray-500">
              Be the first one to share your story.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
