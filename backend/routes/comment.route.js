import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createComment,
  deleteComment,
  editComment,
  getAllCommentsOnBlog,
  getCommentsOfPost,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:id/create", isAuthenticated, createComment);
router.delete("/:id/delete", isAuthenticated, deleteComment);
router.put("/:id/edit", isAuthenticated, editComment);
router.get("/:id/comment/all", isAuthenticated, getCommentsOfPost);
router.get("/:id/like", isAuthenticated, likeComment);
router.get("/my-blogs/comment", isAuthenticated, getAllCommentsOnBlog);

export default router;
