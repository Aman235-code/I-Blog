import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import React, { useState } from "react";
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
import { Loader2 } from "lucide-react";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog, loading } = useSelector((store) => store.blog);

  const getSelectedCategory = (val) => {
    setCategory(val);
  };

  const createBlog = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        "http://localhost:8000/api/v1/blog/create",
        {
          title,
          category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        console.log(res.data.blog)
        dispatch(setBlog([...(Array.isArray(blog) ? blog : []), res.data.blog]));
        navigate(`/dashboard/write-blog/${res.data.blog._id}`);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-4 md:pr-20 h-screen md:ml-80 pt-20">
      <Card className={"md:p-10 p-4 dark:bg-gray-800"}>
        <h1 className="text-2xl font-bold">Let's Create a Blog</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          molestiae debitis odio et voluptatum. Fugiat, assumenda. Possimus
          harum ab esse sint delectus cupiditate.{" "}
        </p>
        <div className="mt-4">
          <div>
            <Label>Title</Label>
            <Input
              type={"text"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your Blog Name"
              className={"bg-white dar:bg-gray-700 mt-3"}
            />
          </div>
          <div className="mt-4 mb-5">
            <Label className="mb-3">Category</Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Select a Category" />
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
          <div className="flex gap-2">
            <Button disabled={loading} onClick={createBlog}>
              {loading ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WriteBlog;
