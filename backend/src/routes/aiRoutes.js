import express from "express";
import { aiSuggestionsController } from "../controllers/aiController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/ai-suggestions
router.post("/", authenticate, aiSuggestionsController);

export default router;