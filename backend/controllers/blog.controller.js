import { Blog } from "../models/blog.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const createBlog = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Blog Title and Category required",
      });
    }

    const blog = await Blog.create({
      title,
      category,
      author: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Blog Created Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Create Blog",
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, subtitle, description, category } = req.body;
    const file = req.file;

    let blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }

    let thumbnail;
    if (file) {
      const fileUri = getDataUri(file);
      thumbnail = await cloudinary.uploader.upload(fileUri);
    }

    const updatedData = {
      title,
      subtitle,
      description,
      category,
      author: req.id,
      thumbnail: thumbnail.secure_url,
    };

    blog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });

    return res.status(200).json({
      success: true,
      message: "Blog Updated Successfully",
      blog,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Update Blog",
    });
  }
};
