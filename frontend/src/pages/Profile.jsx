import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Card } from "../components/ui/card";
import React, { useState } from "react";
import userLogo from "../assets/userLogo.png";
import { Link } from "react-router-dom";
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
  const [open, setOpen] = useState(false);

  const changeEvent = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      // http://localhost:8000/api/v1/user/profile/update
      const formData = new FormData();
      formData.append("firstName", input.firstName);
      formData.append("lastName", input.lastName);
      formData.append("bio", input.bio);
      formData.append("instagram", input.instagram);
      formData.append("occupation", input.occupation);
      formData.append("facebook", input.facebook);
      formData.append("linkedIn", input.linkedIn);
      formData.append("github", input.github);

      if (input.file) {
        formData.append("file", input.file);
      }

      dispatch(setLoading(true));

      const res = await axios.put(
        `http://localhost:8000/api/v1/user/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setOpen(false);
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="pt-20 md:ml-80 md:h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card
          className={
            "flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0"
          }
        >
          <div className="flex flex-col items-center justify-center md:w-100">
            <Avatar className={"w-40 h-40 border-2"}>
              <AvatarImage src={user.photoUrl || userLogo} />
            </Avatar>
            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
              {user.occupation || "MERN Stack Developer"}
            </h1>
            <div className="flex gap-4 items-center">
              <Link>
                <FaFacebook className="w-6 h-6 text-gray-800 dark:text-gray-600" />
              </Link>

              <Link>
                <FaLinkedin className="w-6 h-6 text-gray-800 dark:text-gray-600" />
              </Link>

              <Link>
                <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-600" />
              </Link>

              <Link>
                <FaInstagram className="w-6 h-6 text-gray-800 dark:text-gray-600" />
              </Link>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-center md:text-start text-4xl mb-7">
              Welcome {user.firstName || "User"}
            </h1>
            <p>
              <span className="font-semibold">Email: </span>
              {user.email}
            </p>
            <div className="flex flex-col gap-2 items-start justify-start my-5">
              <Label>About Me</Label>
              <p className="border dark:border-gray-600 p-6 rounded-lg">
                {user.bio || "Learner"}
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)}>Edit Profile</Button>

              <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                  <DialogTitle className={"text-center"}>
                    Edit profile
                  </DialogTitle>
                  <DialogDescription className={"text-center"}>
                    Make changes to your profile here.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                  <div className="flex gap-2">
                    <div className="grid gap-3">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={input.firstName}
                        onChange={changeEvent}
                        name="firstName"
                        placeholder="First Name"
                        className={"col-span-3 text-gray-500"}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={input.lastName}
                        onChange={changeEvent}
                        name="lastName"
                        placeholder="Last Name"
                        className={"col-span-3 text-gray-500"}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="flex gap-2">
                    <div className="grid gap-3">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        type="text"
                        value={input.facebook}
                        onChange={changeEvent}
                        name="facebook"
                        placeholder="Enter a URL"
                        className={"col-span-3 text-gray-500"}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        type="text"
                        value={input.instagram}
                        onChange={changeEvent}
                        name="instagram"
                        placeholder="Enter a URL"
                        className={"col-span-3 text-gray-500"}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="flex gap-2">
                    <div className="grid gap-3">
                      <Label htmlFor="linkedIn">LinkedIn</Label>
                      <Input
                        id="linkedIn"
                        type="text"
                        value={input.linkedIn}
                        onChange={changeEvent}
                        name="linkedIn"
                        placeholder="Enter a URL"
                        className={"col-span-3 text-gray-500"}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="github">Github</Label>
                      <Input
                        id="github"
                        type="text"
                        value={input.github}
                        onChange={changeEvent}
                        name="github"
                        placeholder="Enter a URL"
                        className={"col-span-3 text-gray-500"}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className={"text-right mb-1"}>Description </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={input.bio}
                      onChange={changeEvent}
                      placeholder="Enter a Description"
                      className={"col-span-3 text-gray-500"}
                    />
                  </div>

                  <div>
                    <Label className={"text-right mb-1"}>Picture </Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={changeFileHandler}
                      accept="image/*"
                      className={"w-69.25"}
                    />
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={submitHandler} type="submit">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Please Wait
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
