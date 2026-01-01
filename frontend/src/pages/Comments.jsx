/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { Card } from "../components/ui/card";
import React, { useEffect, useState } from "react";
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
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useSelector } from "react-redux";

const Comments = () => {
  const [allComments, setAllComments] = useState([]);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const getTotalComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/comment/my-blogs/comment`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setAllComments(res.data.comments);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) getTotalComments();
  }, []);

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
    <div className="pb-10 pt-20 md:ml-20 min-h-screen px-4 md:px-0">
      <div className="max-w-6xl mx-auto mt-8">
        {allComments && allComments.length > 0 ? (
          <Card className="w-full p-5 space-y-2 dark:bg-gray-800 overflow-x-auto">
            <Table className="min-w-150">
              <TableCaption className="text-left">
                A list of comments on your blogs.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Blog Title</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allComments.map((comment) => (
                  <TableRow key={comment._id}>
                    <TableCell className="font-medium">
                      <h1 className="truncate max-w-30 md:max-w-full cursor-pointer hover:underline"
                          onClick={() => navigate(`/blogs/${comment.postId._id}`)}>
                        {comment.postId.title}
                      </h1>
                    </TableCell>
                    <TableCell className="truncate max-w-37.5 md:max-w-full">
                      {comment.content}
                    </TableCell>
                    <TableCell>{comment.userId.firstName}</TableCell>
                    <TableCell className="text-center flex justify-center">
                      <Eye
                        className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-500"
                        onClick={() => navigate(`/blogs/${comment.postId._id}`)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center">
              No comments yet
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
              Looks like no one has commented on your blogs yet. Share your thoughts and engage your audience!
            </p>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
