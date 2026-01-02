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
          `${import.meta.env.VITE_API_URL}/api/v1/blog/get-published-blogs`,
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
    <section className="relative py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-14 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Recent Blogs
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Read the latest thoughts, tutorials, and insights from our writers.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 px-4">
        {/* Blog list */}
        <div className="lg:col-span-2 space-y-8">
          {blog && blog.length > 0 ? (
            blog
              .slice(0, 3)
              .map((item, index) => <BlogCardList key={index} blog={item} />)
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 p-8 sm:p-12 text-center backdrop-blur">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                No blogs published yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Looks quiet here. Be the first to publish a blog and share your
                ideas with the community.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Categories */}
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
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
                  className="cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-purple-500 hover:text-white transition"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Newsletter
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get new posts straight to your inbox.
            </p>
            <div className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-100 dark:bg-gray-700"
              />
              <Button className="w-full">Subscribe</Button>
            </div>
          </div>

          {/* Suggested */}
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Suggested Reads
            </h2>
            <ul className="space-y-3 text-sm">
              {[
                "10 Tips to Master React",
                "Understanding Tailwind CSS",
                "Improve SEO in 2025",
              ].map((title, index) => (
                <li
                  key={index}
                  className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-purple-500 transition"
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default RecentBlog;
