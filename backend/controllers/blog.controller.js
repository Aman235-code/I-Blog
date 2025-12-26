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

export const getBlogs = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id is required",
      });
    }

    const blogs = await Blog.find({ author: userId }).populate({
      path: "author",
      select: "firstName lastName photoUrl",
    });

    if (!blogs) {
      return res.status(400).json({
        success: false,
        message: "Blogs not found",
        blogs: [],
      });
    }

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Get Blogs",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log(blogId);
    const authorId = req.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not Found",
      });
    }

    if (blog.author.toString() !== authorId) {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to delete this blog",
      });
    }

    await Blog.findByIdAndDelete(blogId);
    return res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Delete Blog",
      error: error.message,
    });
  }
};

export const getPublishedBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "firstName lastName photoUrl",
      });

    if (!blogs) {
      return res.status(401).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get published Blogs",
      error: error.message,
    });
  }
};

export const togglePublishBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { publish } = req.query;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.isPublished = !publish;
    await blog.save();

    const statusMessage = blog.isPublished ? "Published" : "Unpublished";

    return res.status(200).json({
      success: true,
      message: `Blog is ${statusMessage}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const likeId = req.id;
    const blog = await Blog.findById(blogId).populate({
      path: "likes",
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await blog.updateOne({ $addToSet: { likes: likeId } });
    await blog.save();

    return res.status(200).json({
      success: true,
      message: `Blog Liked`,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Like Blog",
      error: error.message,
    });
  }
};

export const dislikeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const likeId = req.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await blog.updateOne({ $pull: { likes: likeId } });
    await blog.save();

    return res.status(200).json({
      success: true,
      message: `Blog Disliked`,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to dislike blog",
      error: error.message,
    });
  }
};

export const getMyTotalBlogLikes = async (req, res) => {
  try {
    const userId = req.id;
    const myBlogs = await Blog.find({ author: userId }).select("likes");
    const totalLikes = myBlogs.reduce(
      (acc, blog) => acc + (blog.likes?.length || 0),
      0
    );

    return res.status(200).json({
      success: true,
      totalBlogs: myBlogs.length,
      totalLikes: totalLikes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch total blog likes",
      error: error.message,
    });
  }
};
