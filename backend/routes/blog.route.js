import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  updateBlog,
} from "../controllers/blog.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/create", isAuthenticated, createBlog);
router.put("/update/:id", isAuthenticated, singleUpload, updateBlog);
router.get("/blogs", isAuthenticated, getBlogs);
router.delete("/delete/:id", isAuthenticated, deleteBlog);

export default router;
