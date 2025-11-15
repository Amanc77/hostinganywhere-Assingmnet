import express from "express";
import { getPlans } from "../controllers/plans.controller.js";

const router = express.Router();

router.get("/", getPlans);

export default router;
