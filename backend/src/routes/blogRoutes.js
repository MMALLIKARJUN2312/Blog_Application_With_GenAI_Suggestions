// Import express router
import express from "express";

// Import controllers
import {
  createBlogController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogController,
  deleteBlogController,
} from "../controllers/blogController.js";

// Import authentication middleware
import { authenticate } from "../middleware/authMiddleware.js";

// Create router instance
const router = express.Router();

// POST /api/blogs
router.post("/", authenticate, createBlogController);

// GET /api/blogs
router.get("/", getAllBlogsController);

// GET /api/blogs/:id
router.get("/:id", getBlogByIdController);

//PUT /api/blogs/:id
router.put("/:id", authenticate, updateBlogController);

//DELETE /api/blogs/:id
router.delete("/:id", authenticate, deleteBlogController);

export default router;