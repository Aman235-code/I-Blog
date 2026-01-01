import BlogCard from "../components/BlogCard";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SearchList = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q");
  const { blog } = useSelector((store) => store.blog);

  const filteredBlogs = blog.filter(
    (blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      blog.category.toLowerCase() === query.toLowerCase()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  return (
    <div className="pt-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-5 text-2xl font-semibold">
          Search result for: "{query}"
        </h2>

        {filteredBlogs && filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 my-10">
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center p-10 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">No blogs found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Sorry, we couldn’t find any blogs matching "{query}". Try a different keyword or explore other posts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchList;
