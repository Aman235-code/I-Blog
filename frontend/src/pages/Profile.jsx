import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Card } from "../components/ui/card";
import React from "react";
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

const Profile = () => {
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
              <AvatarImage src={userLogo} />
            </Avatar>
            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
              MERN Stack Developer
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
              Welcome User
            </h1>
            <p>
              <span className="font-semibold">Email: </span>aman@gmail.com
            </p>
            <div className="flex flex-col gap-2 items-start justify-start my-5">
              <Label>About Me</Label>
              <p className="border dark:border-gray-600 p-6 rounded-lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
                aperiam delectus quo natus voluptatem dolorem inventore error
                fuga ratione. Tempora, placeat? Vel voluptate dolore molestias
                nihil voluptatem ipsa autem quaerat earum dicta.
              </p>
            </div>

            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button>Edit Profile</Button>
                </DialogTrigger>
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
                        placeholder="Enter a Description"
                        className={"col-span-3 text-gray-500"}
                      />
                    </div>

                    <div>
                      <Label className={"text-right mb-1"}>Picture </Label>
                      <Input
                        id="file"
                        type="file"
                        accept="image/*"
                        className={"w-69.25"}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
