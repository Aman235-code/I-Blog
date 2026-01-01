import { ChartColumnBig, SquareUser } from "lucide-react";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";
import { HiMenuAlt1, HiX } from "react-icons/hi";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { path: "/dashboard/profile", label: "Profile", icon: <SquareUser /> },
    {
      path: "/dashboard/your-blog",
      label: "Your Blogs",
      icon: <ChartColumnBig />,
    },
    {
      path: "/dashboard/comments",
      label: "Comments",
      icon: <LiaCommentSolid />,
    },
    {
      path: "/dashboard/write-blog",
      label: "Create Blog",
      icon: <FaRegEdit />,
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md shadow"
        onClick={() => setOpen(true)}
      >
        <HiMenuAlt1 size={24} />
      </button>

      {/* Backdrop for mobile */}
      {open && (
        <div
          className="fixed inset-0  bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 md:h-full bg-white dark:bg-gray-800 border-r-2 border-gray-300 dark:border-gray-600
          w-64 md:w-72
          transform ${
            open ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out
          md:translate-x-0 md:block md:relative md:top-0 md:left-0 md:h-screen
        `}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-4">
          <HiX
            size={24}
            className="cursor-pointer text-gray-700 dark:text-gray-200"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="text-center pt-10 px-3 space-y-2">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) =>
                `text-xl md:text-2xl ${
                  isActive
                    ? "bg-gray-800 dark:bg-gray-900 text-gray-200"
                    : "bg-transparent text-gray-800 dark:text-gray-200"
                } flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full hover:bg-gray-100 dark:hover:bg-gray-700 transition`
              }
              onClick={() => setOpen(false)} // close drawer on mobile
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
