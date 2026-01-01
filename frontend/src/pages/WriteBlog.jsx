import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { setBlog } from "../redux/blogSlice";
import { setLoading } from "../redux/authSlice";
import { Loader2, PenLine } from "lucide-react";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog, loading } = useSelector((store) => store.blog);
  const { user } = useSelector((store) => store.auth);

  const createBlog = async () => {
    if (!user) {
      return toast.error("Please Login to continue creating your blogs");
    }

    if (!title || !category) {
      return toast.error("Please fill all required fields");
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        "http://localhost:8000/api/v1/blog/create",
        { title, category },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(
          setBlog([...(Array.isArray(blog) ? blog : []), res.data.blog])
        );
        navigate(`/dashboard/write-blog/${res.data.blog._id}`);
      }
    } catch (error) {
      toast.error(error.message);
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
            Please login to access this page and manage your blogs and profile.
          </p>
          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </div>
      );
    }

  return (
    <div className="min-h-screen pt-20 px-4 md:ml-80 md:pr-20 bg-gray-50 dark:bg-gray-900">
      <Card className="max-w-3xl mx-auto p-6 md:p-10 rounded-2xl shadow-lg dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <PenLine className="text-blue-600" />
          <h1 className="text-2xl md:text-3xl font-bold">Start a New Blog</h1>
        </div>

        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-8">
          Give your blog a clear title and choose a category. Once created,
          you’ll be taken to the editor where you can write, format, and publish
          your story for the world to read.
        </p>

        {/* Form */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <Label className="text-sm font-medium">Blog Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How I Built My First React App"
              className="mt-2 dark:bg-gray-900"
            />
          </div>

          {/* Category */}
          <div>
            <Label className="text-sm font-medium">Category</Label>
            <Select onValueChange={setCategory}>
              <SelectTrigger className="mt-2 w-full md:w-64">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="Web Development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="Digital Marketing">
                    Digital Marketing
                  </SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Cooking">Cooking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Action */}
          <div className="pt-2">
            <Button disabled={loading} onClick={createBlog} className="px-6">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Blog"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WriteBlog;
