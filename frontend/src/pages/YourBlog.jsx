/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "../components/ui/card";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "../redux/blogSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const YourBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog } = useSelector((store) => store.blog);
  const { user } = useSelector((store) => store.auth);

  const getBlogs = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/blog/blogs`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs));
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getBlogs();
    }
  }, []);

  const formatDate = (index) => {
    const date = new Date(blog[index].createdAt);
    const fDate = date.toLocaleDateString("en-GB");
    return fDate;
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/blog/delete/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id);
        dispatch(setBlog(updatedBlogData));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          You are not logged in
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Please login to access this page and manage your blogs and profile.
        </p>
        <Button onClick={() => navigate("/login")}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="pb-10 pt-20 md:ml-80 h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className={"w-full p-5 space-y-2 dark:bg-gray-800"}>
          <Table>
            <TableCaption>A list of your recent blogs.</TableCaption>
            <TableHeader className={"overflow-x-auto"}>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={"overflow-x-auto"}>
              {blog.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="flex gap-4 items-center">
                    <img
                      src={item.thumbnail}
                      className="w-20 rounded-md hidden md:block"
                    />
                    <h1
                      onClick={() => navigate(`/blogs/${item._id}`)}
                      className="hover:underline cursor-pointer w-20 md:w-full truncate"
                    >
                      {item.title}
                    </h1>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{formatDate(index)}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        {" "}
                        <BsThreeDotsVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/dashboard/write-blog/${item._id}`)
                          }
                        >
                          <Edit />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteBlog(item._id)}
                          className={"text-red-500"}
                        >
                          <Trash2 className={"text-red-500"} />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default YourBlog;
