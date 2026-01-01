/* eslint-disable react-hooks/exhaustive-deps */
import { setBlog } from "../redux/blogSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import BlogCardList from "./BlogCardList";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const RecentBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog } = useSelector((store) => store.blog);

  useEffect(() => {
    const getAllPublishedBlogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/blog/get-published-blogs",
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        }
      } catch (error) {
        toast.error(error?.message || "Failed to load blogs");
      }
    };

    getAllPublishedBlogs();
  }, []);

  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-16">
      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-12 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Recent Blogs</h1>
        <div className="w-20 h-1 mx-auto bg-red-500 rounded-full" />
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 px-4">
        
        {/* Blog list */}
        <div className="lg:col-span-2 space-y-6">
          {blog?.slice(0, 4)?.map((item, index) => (
            <BlogCardList key={index} blog={item} />
          ))}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block mt-6">
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 space-y-8 shadow-sm">
            
            {/* Categories */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Popular Categories
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Blogging",
                  "Web Development",
                  "Digital Marketing",
                  "Cooking",
                  "Photography",
                  "Sports",
                ].map((item, index) => (
                  <Badge
                    key={index}
                    onClick={() => navigate(`/search?q=${item}`)}
                    className="cursor-pointer hover:scale-105 transition"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Subscribe to Newsletter
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Get the latest posts delivered to your inbox.
              </p>
              <div className="flex flex-col gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-100 dark:bg-gray-800"
                />
                <Button className="w-full">Subscribe</Button>
              </div>
            </div>

            {/* Suggested */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                Suggested Blogs
              </h2>
              <ul className="space-y-3 text-sm">
                {[
                  "10 Tips to Master React",
                  "Understanding Tailwind CSS",
                  "Improve SEO in 2025",
                ].map((title, index) => (
                  <li
                    key={index}
                    className="cursor-pointer text-gray-700 dark:text-gray-200 hover:underline"
                  >
                    {title}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </aside>
      </div>
    </section>
  );
};

export default RecentBlog;
