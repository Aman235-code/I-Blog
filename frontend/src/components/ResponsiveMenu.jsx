import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const ResponsiveMenu = ({ openNav, setOpenNav, logoutHandler }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-full"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-800 px-8 pb-6 pt-16 text-black dark:text-gray-100 md:hidden rounded-r-xl shadow-md transition-all`}
    >
      <div>
        {/* User Info */}
        <div className="flex items-center justify-start gap-3">
          {user ? (
            <Avatar className="w-14 h-14">
              <AvatarImage src={user.photoUrl} />
              <AvatarFallback>{user.firstName[0]}</AvatarFallback>
            </Avatar>
          ) : (
            <FaUserCircle size={50} />
          )}
          <div>
            <h1 className="font-semibold text-lg">
              {user ? `Hello, ${user.firstName}` : "Welcome, Guest"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user ? "Premium User" : "Please login to continue"}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-12">
          <ul className="flex flex-col gap-7 text-2xl font-semibold">
            <Link to="/" onClick={() => setOpenNav(false)}>
              <li className="cursor-pointer">Home</li>
            </Link>
            <Link to="/blogs" onClick={() => setOpenNav(false)}>
              <li className="cursor-pointer">Blogs</li>
            </Link>
            <Link to="/about" onClick={() => setOpenNav(false)}>
              <li className="cursor-pointer">About</li>
            </Link>

            {/* Conditional login/logout */}
            {user ? (
              <Button
                onClick={() => {
                  logoutHandler();
                  setOpenNav(false);
                }}
                className="mt-4"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => {
                  navigate("/login");
                  setOpenNav(false);
                }}
                className="mt-4"
              >
                Login
              </Button>
            )}
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <div className="pb-20 text-center text-sm text-gray-500 dark:text-gray-400">
        Made with ❤ by Aman
      </div>
    </div>
  );
};

export default ResponsiveMenu;
