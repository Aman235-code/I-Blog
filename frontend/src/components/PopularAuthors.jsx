/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import userLogo from "../assets/userlogo.png";

const PopularAuthors = () => {
  const [popularUser, setPopularUser] = useState([]);
  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/user/all-users"
      );

      if (res.data.success) {
        setPopularUser(res.data.users);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4 items-center">
          <h1 className="text-3xl md:text-4xl font-bold pt-10">
            Popular Authors
          </h1>
          <hr className="w-24 text-center border-2 border-red-500 rounded-full" />
        </div>

        <div className="flex items-center justify-around pb-10 my-10 px-4 md:px-0">
          {popularUser?.slice(0, 3)?.map((user, idx) => {
            return (
              <div key={idx} className="flex flex-col gap-2 items-center">
                <img
                  className="rounded-full w-16 h-16 md:w-32 md:h-32"
                  src={user.photoUrl || userLogo}
                />
                <p className="font-semibold">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularAuthors;
