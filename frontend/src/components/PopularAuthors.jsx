/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import userLogo from "../assets/userlogo.png";

const PopularAuthors = () => {
  const [popularUser, setPopularUser] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/user/all-users"
      );

      if (res.data.success) {
        setPopularUser(res.data.users);
      }
    } catch (error) {
      toast.error(error?.message || "Failed to load authors");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Popular Authors
          </h1>
          <div className="w-20 h-1 mx-auto bg-red-500 rounded-full" />
        </div>

        {/* Authors grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {popularUser?.slice(0, 4)?.map((user, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              <img
                src={user.photoUrl || userLogo}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
              />

              <p className="font-semibold text-center">
                {user.firstName} {user.lastName}
              </p>

              <span className="text-sm text-gray-500 dark:text-gray-400">
                Author
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularAuthors;
