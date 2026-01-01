import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Card } from "../components/ui/card";
import React, { useState } from "react";
import userLogo from "../assets/userlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setLoading, setUser } from "../redux/authSlice";
import { Loader2 } from "lucide-react";
import TotalProperty from "../components/TotalProperty";

const Profile = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    occupation: user?.occupation,
    bio: user?.bio,
    instagram: user?.instagram,
    facebook: user?.facebook,
    github: user?.github,
    linkedIn: user?.linkedIn,
    file: user?.photoUrl,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const changeEvent = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const changeFileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(input).forEach((key) => {
        if (input[key]) formData.append(key, input[key]);
      });

      dispatch(setLoading(true));

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/user/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setOpen(false);
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          You are not logged in
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Please login to access your profile and manage your blogs.
        </p>
        <Button onClick={() => navigate("/login")}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="pt-10 md:ml-5 min-h-screen px-4 md:px-0">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="flex flex-col md:flex-row gap-8 md:gap-12 p-6 md:p-10 dark:bg-gray-800">
          {/* Left section: Avatar & Social Links */}
          <div className="flex flex-col items-center md:w-1/3">
            <Avatar className="w-40 h-40 border-2 mb-4">
              <AvatarImage src={user.photoUrl || userLogo} />
            </Avatar>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {user.occupation || "MERN Stack Developer"}
            </h2>
            <div className="flex gap-4 text-gray-700 dark:text-gray-400">
              <Link to={user.facebook || "#"} target="_blank">
                <FaFacebook className="w-6 h-6 hover:text-blue-600 transition" />
              </Link>
              <Link to={user.linkedIn || "#"} target="_blank">
                <FaLinkedin className="w-6 h-6 hover:text-blue-500 transition" />
              </Link>
              <Link to={user.github || "#"} target="_blank">
                <FaGithub className="w-6 h-6 hover:text-gray-900 transition" />
              </Link>
              <Link to={user.instagram || "#"} target="_blank">
                <FaInstagram className="w-6 h-6 hover:text-pink-600 transition" />
              </Link>
            </div>
          </div>

          {/* Right section: Profile Details */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
              Welcome, {user.firstName || "User"}
            </h1>
            <p className="mb-3">
              <span className="font-semibold">Email: </span>
              {user.email}
            </p>

            <div className="mb-6">
              <Label>About Me</Label>
              <p className="border mt-2 dark:border-gray-600 rounded-lg p-5 text-gray-700 dark:text-gray-300">
                {user.bio || "Just a passionate learner and blogger."}
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)} className="mb-4 cursor-pointer">
                Edit Profile
              </Button>

              <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl">Edit Profile</DialogTitle>
                  <DialogDescription className="text-center text-gray-500 mb-4">
                    Update your profile information
                  </DialogDescription>
                </DialogHeader>

                <form className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={input.firstName}
                        onChange={changeEvent}
                        placeholder="First Name"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={input.lastName}
                        onChange={changeEvent}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        name="facebook"
                        value={input.facebook}
                        onChange={changeEvent}
                        placeholder="Enter a URL"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        name="instagram"
                        value={input.instagram}
                        onChange={changeEvent}
                        placeholder="Enter a URL"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <Label htmlFor="linkedIn">LinkedIn</Label>
                      <Input
                        id="linkedIn"
                        name="linkedIn"
                        value={input.linkedIn}
                        onChange={changeEvent}
                        placeholder="Enter a URL"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="github">Github</Label>
                      <Input
                        id="github"
                        name="github"
                        value={input.github}
                        onChange={changeEvent}
                        placeholder="Enter a URL"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="bio">Description</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={input.bio}
                      onChange={changeEvent}
                      placeholder="Enter a description about yourself"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="file">Profile Picture</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={changeFileHandler}
                      accept="image/*"
                    />
                  </div>

                  <DialogFooter className="flex flex-col md:flex-row justify-end gap-2 mt-4">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={submitHandler}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                          Please Wait
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <TotalProperty />
      </div>
    </div>
  );
};

export default Profile;
