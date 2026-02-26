import {createBlog, getAllBlogs, getBlogById, updateBlog,deleteBlog} from "../models/blogModel.js";

// Import markdown parser
import { marked } from "marked";

// Create Blog Controller
export const createBlogController = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Validate input
    if (!title || !content || !author) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userId = req.user?.id || null;

    const postId = await createBlog(title, content, author, userId);

    res.status(201).json({
      message: "Blog post created successfully",
      postId,
    });
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all blogs
export const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await getAllBlogs();

    // Convert markdown to HTML
    const formattedBlogs = blogs.map((blog) => ({
      ...blog,
      content: marked(blog.content),
    }));

    res.status(200).json(formattedBlogs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get single blog
export const getBlogByIdController = async (req, res) => {
  try {
    const blog = await getBlogById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.content = marked(blog.content);

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update blog
export const updateBlogController = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updated = await updateBlog(req.params.id, title, content);

    if (updated === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete blog
export const deleteBlogController = async (req, res) => {
  try {
    const deleted = await deleteBlog(req.params.id);

    if (deleted === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};