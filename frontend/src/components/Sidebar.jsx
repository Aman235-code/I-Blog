import {
  ChartColumnBig,
  SquareUser,
} from "lucide-react";
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
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[60] rounded-lg bg-gray-900 p-2 text-white shadow-lg"
      >
        <HiMenuAlt1 size={24} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-[55]
          h-screen w-64
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:z-auto
        `}
      >
        {/* Mobile close */}
        <div className="md:hidden flex justify-end p-4">
          <HiX
            size={24}
            className="cursor-pointer text-gray-700 dark:text-gray-200"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Content */}
        <div className="h-full overflow-y-auto px-4 pb-6">
          <h2 className="mb-6 mt-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
            Dashboard
          </h2>

          <nav className="space-y-2">
            {menuItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
                  transition
                  ${
                    isActive
                      ? "bg-gray-900 text-white dark:bg-gray-800"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `
                }
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
