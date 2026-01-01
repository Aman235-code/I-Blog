/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { LuSend } from "react-icons/lu";
import axios from "axios";
import { setComment } from "../redux/commentSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "sonner";
import { setBlog } from "../redux/blogSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import { Edit, Trash2 } from "lucide-react";

const CommentBox = ({ selectedBlog }) => {
  const dispatch = useDispatch();
  const { comment } = useSelector((store) => store.comment);
  const { blog } = useSelector((store) => store.blog);
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState("");
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    const getAllCommentsOfBlog = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/comment/${selectedBlog._id}/comment/all`,
          { withCredentials: true }
        );
        const data = res.data.comments;
        dispatch(setComment(data));
      } catch (error) {
        console.log(error.message);
      }
    };

    getAllCommentsOfBlog();
  }, []);

  const changeEvent = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setContent(inputText);
    } else {
      setContent("");
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/comment/${commentId}/delete`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedCommentData = comment.filter(
          (item) => item._id !== commentId
        );
        dispatch(setComment(updatedCommentData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const editCommentHandler = async (commentId) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/comment/${commentId}/edit`,
        {
          content: editing,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        const updatedCommentData = comment.map((item) =>
          item._id === commentId ? { ...item, content: editing } : item
        );
        dispatch(setComment(updatedCommentData));
        toast.success(res.data.message);
        setEditingId(null);
        setEditing("");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/comment/${selectedBlog._id}/create`,
        { content },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        let updatedCommentData;
        if (comment.length >= 1) {
          updatedCommentData = [...comment, res.data.comment];
        } else {
          updatedCommentData = [res.data.comment];
        }
        dispatch(setComment(updatedCommentData));
        const updatedBlogData = blog.map((blog) =>
          blog._id === selectedBlog._id
            ? { ...blog, comments: updatedCommentData }
            : blog
        );
        dispatch(setBlog(updatedBlogData));
        toast.success(res.data.message);
        setContent("");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const likeCommentHandler = async (commentId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/comment/${commentId}/like`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedComment = res.data.updatedComment;
        const updatedCommentList = comment.map((item) =>
          item._id === commentId ? updatedComment : item
        );
        dispatch(setComment(updatedCommentList));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <div className="flex gap-4 mb-4 items-center">
        <Avatar>
          <AvatarImage src={user.photoUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold">
          {user.firstName} {user.lastName}
        </h3>
      </div>

      <div className="flex gap-3">
        <Textarea
          placeholder="Leave a comment"
          className={"bg-gray-100 dark:bg-gray-800"}
          value={content}
          onChange={changeEvent}
        />
        <Button className="cursor-pointer" onClick={commentHandler}>
          <LuSend />
        </Button>
      </div>
      {comment.length > 0 ? (
        <div className="mt-7 bg-gray-100 dark:bg-gray-800 p-5 rounded-md">
          {comment.map((item, index) => {
            return (
              <div key={index} className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 items-start">
                    <Avatar>
                      <AvatarImage src={item?.userId?.photoUrl} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="mb-2 space-y-1 md:w-100">
                      <h1 className="font-semibold">
                        {item?.userId?.firstName} {item?.userId?.lastName}
                        <span className="text=sm ml-2 font-light">
                          yesterday
                        </span>
                      </h1>
                      {editingId === item?._id ? (
                        <>
                          <Textarea
                            value={editing}
                            onChange={(e) => setEditing(e.target.value)}
                            className={"mb-2 bg-gray-200 dark:bg-gray-700"}
                          />
                          <div className="flex py-1 gap-2">
                            <Button
                              onClick={() => editCommentHandler(item._id)}
                            >
                              Save
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setEditingId(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </>
                      ) : (
                        <p>{item?.content}</p>
                      )}

                      <div className="flex gap-5 items-center">
                        <div className="flex gap-2 items-center">
                          <div
                            onClick={() => likeCommentHandler(item._id)}
                            className="flex gap-1 items-center cursor-pointer"
                          >
                            {item.likes.includes(user._id) ? (
                              <FaHeart fill="red" />
                            ) : (
                              <FaRegHeart />
                            )}

                            <span>{item?.numberOfLikes}</span>
                          </div>
                        </div>
                        <p className="text-sm cursor-pointer">Reply</p>
                      </div>
                    </div>
                  </div>
                  {user._id === item?.userId?._id ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <BsThreeDots />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingId(item._id);
                            setEditing(item.content);
                          }}
                        >
                          <Edit />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteComment(item._id)}
                          className={"text-red-500"}
                        >
                          <Trash2 />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default CommentBox;
