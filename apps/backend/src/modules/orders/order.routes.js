import express from "express";
import { create, list } from "./order.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, create);
router.get("/", protect, list);

export default router;
