import { Blog } from "../models/blog.model.js";
import { Comment } from "../models/comment.modal.js";

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentUserId = req.id;
    const { content } = req.body;

    const blog = await Blog.findById(postId);

    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "Blog Not found",
      });
    }

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    const comment = await Comment.create({
      content,
      userId: commentUserId,
      postId,
    });

    await comment.populate({
      path: "userId",
      select: "firstName lastName photoUrl",
    });

    blog.comments.push(comment._id);

    await blog.save();

    return res.status(201).json({
      success: true,
      message: "Comment Added",
      comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Create Comment",
      error: error.message,
    });
  }
};

export const getCommentsOfPost = async (req, res) => {
  try {
    const blogId = req.params.id;
    const comments = await Comment.find({ postId: blogId })
      .populate({
        path: "userId",
        select: "firstName lastName photoUrl",
      })
      .sort({
        createdAt: -1,
      });

    if (!comments) {
      return res.status(404).json({
        success: false,
        message: "No comments found in this blog",
      });
    }

    return res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to Create Comment",
      error: error.message,
    });
  }
};
