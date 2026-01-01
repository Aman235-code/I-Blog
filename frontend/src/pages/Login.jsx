/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import auth from "../assets/auth.jpg";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "../redux/authSlice";
import { motion } from "framer-motion";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex h-screen md:pt-14">
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:block h-full"
      >
        <img src={auth} alt="login" className="h-full w-full object-cover" />
      </motion.div>

      {/* Form Section */}
      <div className="flex flex-1 items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="rounded-2xl shadow-xl dark:bg-gray-800">
            <CardHeader className="space-y-1">
              <CardTitle className="text-center text-2xl font-bold">
                Welcome Back
              </CardTitle>
              <p className="text-center text-sm text-gray-500 dark:text-gray-300">
                Login to continue to your account
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="relative">
                  <Label>Email</Label>
                  <Mail className="absolute left-3 top-8 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="pl-9 mt-2 dark:bg-gray-900"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Label>Password</Label>
                  <Lock className="absolute left-3 top-8 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="pl-9 mt-2 pr-10 dark:bg-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
                  >
                    {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>

                {/* Button */}
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button type="submit" className="w-full cursor-pointer">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </motion.div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium underline hover:text-black dark:hover:text-white"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
