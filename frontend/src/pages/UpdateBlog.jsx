import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import React, { useRef, useState } from "react";
import { Input } from "../components/ui/input";
import JoditEditor from "jodit-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setLoading } from "../redux/authSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";

const UpdateBlog = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.blogId;
  const { blog, loading } = useSelector((store) => store.blog);
  const selectBlog = blog.find((blog) => blog._id === id);

  const [content, setContent] = useState(selectBlog?.description);
  const dispatch = useDispatch();

  const [blogData, setBlogData] = useState({
    title: selectBlog?.title,
    subtitle: selectBlog?.subtitle,
    description: content,
    category: selectBlog?.category,
  });

  const [preview, setPreview] = useState(selectBlog?.thumbnail);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectCategory = (value) => {
    setBlogData({ ...blogData, category: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogData({ ...blogData, thumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const updateBlogHandler = async () => {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("subtitle", blogData.subtitle);
    formData.append("description", content);
    formData.append("category", blogData.category);
    formData.append("file", blogData.thumbnail);
    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `http://localhost:8000/api/v1/blog/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        console.log(blogData);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="md:ml-80 pt-20 px-3 pb-10">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className={"w-full bg-white dark:bg-gray-800 p-5 -space-y-3"}>
          <h1 className="text-4xl font-bold">Basic Blog Information</h1>
          <p>
            Make changes to your blogs here. Click publish when you are done.
          </p>
          <div className="space-x-2">
            <Button>Publish</Button>
            <Button variant="destructive">Remove Blog</Button>
          </div>

          <div className="pt-3">
            <Label className={"mb-2"}>Title</Label>
            <Input
              type="text"
              placeholder="Enter your Title"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              className={"dark:border-gray-300"}
            />
          </div>

          <div className="pt-3">
            <Label className={"mb-2"}>Subtitle</Label>
            <Input
              type="text"
              placeholder="Enter your Subtitle"
              value={blogData.subtitle}
              onChange={handleChange}
              name="subtitle"
              className={"dark:border-gray-300"}
            />
          </div>

          <div>
            <Label className={"mb-2"}>Description</Label>
            <JoditEditor
              ref={editor}
              className="jodit_toolbar"
              value={blogData.description}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>

          <div className="pt-3">
            <Label className={"mb-2"}>Category</Label>
            <Select
              onValueChange={selectCategory}
              className="dark:border-gray-300"
            >
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

          <div>
            <Label className={"mb-2"}>Thumbnail</Label>
            <Input
              type="file"
              id="file"
              onChange={selectThumbnail}
              accept="image/*"
              className={"w-fit dark:border-gray-300"}
            />
            {preview && (
              <img src={preview} className="w-64 my-2" alt="Blog Thumbnail" />
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button onClick={updateBlogHandler}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UpdateBlog;
