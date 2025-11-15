import express from "express";
import { getMe, updateMe } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", isAuthenticated, getMe);
router.put("/me", isAuthenticated, updateMe);

export default router;
