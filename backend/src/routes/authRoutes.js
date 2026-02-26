import express from "express";
import { registerController,loginController} from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerController);

// POST /api/auth/login

router.post("/login", loginController);

export default router;