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
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex h-screen md:pt-14 md:h-170">
      <div className="hidden md:block">
        <img src={auth} className="h-165 w-175" />
      </div>

      <div className="flex justify-center items-center flex-1 px-4 md:px-0">
        <Card
          className={
            "w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600"
          }
        >
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-xl font-semibold">
                Create an Account
              </h1>
            </CardTitle>
            <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">
              Enter your details below to create your account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={user.firstName}
                    onChange={handleChange}
                    name="firstName"
                    className={"dark:border-gray-600 dark:bg-gray-900 "}
                  />
                </div>

                <div>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={user.lastName}
                    onChange={handleChange}
                    name="lastName"
                    className={"dark:border-gray-600 dark:bg-gray-900 "}
                  />
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={user.email}
                  onChange={handleChange}
                  name="email"
                  className={"dark:border-gray-600 dark:bg-gray-900 "}
                />
              </div>

              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="Create a Password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className={"dark:border-gray-600 dark:bg-gray-900 "}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-5 text-gray-500"
                >
                  {showPass ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              <Button type="submit" className={"w-full"}>
                Sign Up
              </Button>
              <p className="text-center text=gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link to={"/login"}>
                  <span className="underline cursor-pointer hover:text-gray-800 dark:hover:text-gray-100">
                    Sign in
                  </span>
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
