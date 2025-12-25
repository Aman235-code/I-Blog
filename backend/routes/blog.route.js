import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { createBlog, updateBlog } from "../controllers/blog.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/create", isAuthenticated, createBlog);
router.put("/update/:id", isAuthenticated, singleUpload, updateBlog);

export default router;
