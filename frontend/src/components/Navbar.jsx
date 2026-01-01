import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChartColumnBig, LogOut, Search, User } from "lucide-react";
import { FaMoon, FaRegEdit, FaSun } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { LiaCommentSolid } from "react-icons/lia";
import userLogo from "../assets/userlogo.png";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [openNav, setOpenNav] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={Logo}
                alt="logo"
                className="w-8 h-8 md:w-9 md:h-9 dark:invert"
              />
              <h1 className="text-xl md:text-2xl font-bold">I-Blog</h1>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <Input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pr-10 dark:bg-gray-900"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <Search size={18} />
              </Button>
            </form>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <Button
              size="icon"
              variant="outline"
              className={"cursor-pointer"}
              onClick={() => dispatch(toggleTheme())}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </Button>

            {/* Desktop nav */}
            <ul className="hidden md:flex gap-6 font-medium">
              <Link to="/">Home</Link>
              <Link to="/blogs">Blogs</Link>
              <Link to="/about">About</Link>
            </ul>

            {/* User */}
            {user ? (
              <div className="hidden md:flex  items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          className={"cursor-pointer"}
                          src={user.photoUrl || userLogo}
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/profile")}
                      >
                        <User /> Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/your-blog")}
                      >
                        <ChartColumnBig /> Your Blogs
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/comments")}
                      >
                        <LiaCommentSolid /> Comments
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate("/dashboard/write-blog")}
                      >
                        <FaRegEdit /> Write Blog
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex gap-2 cursor-pointer">
                <Link to="/login">
                  <Button className={"cursor-pointer"} variant="outline">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className={"cursor-pointer"}>Signup</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button onClick={() => setOpenNav(!openNav)} className="md:hidden">
              {openNav ? (
                <HiMenuAlt3 className="w-7 h-7" />
              ) : (
                <HiMenuAlt1 className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <ResponsiveMenu
        openNav={openNav}
        setOpenNav={setOpenNav}
        logoutHandler={handleLogout}
      />

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
