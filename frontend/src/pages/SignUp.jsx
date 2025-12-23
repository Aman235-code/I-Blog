import React from "react";
import auth from "../assets/auth.jpg";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

const SignUp = () => {
  return (
    <div className="flex h-screen md:pt-14 md:h-190">
      <div className="hidden md:block">
        <img src={auth} className="h-175" />
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
            <form className="space-y-4">
              <div className="flex gap-3">
                <div>
                  <Label>First Name</Label>
                  <Input type="text" placeholder="First Name" name=""/>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
