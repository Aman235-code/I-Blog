import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createBlog,
  deleteBlog,
  dislikeBlog,
  getBlogs,
  getMyTotalBlogLikes,
  getPublishedBlog,
  likeBlog,
  togglePublishBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/create", isAuthenticated, createBlog);
router.put("/update/:id", isAuthenticated, singleUpload, updateBlog);
router.get("/blogs", isAuthenticated, getBlogs);
router.delete("/delete/:id", isAuthenticated, deleteBlog);

router.post("/:blogId/like", isAuthenticated, likeBlog);
router.post("/:blogId/dislike", isAuthenticated, dislikeBlog);

router.get("/my-blogs/likes", isAuthenticated, getMyTotalBlogLikes);

router.get("/get-published-blogs", isAuthenticated, getPublishedBlog);

router.patch("/:blogId", isAuthenticated, togglePublishBlog);

export default router;
