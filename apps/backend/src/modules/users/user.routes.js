import express from "express";
import { create, agents } from "./user.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), create);
router.get("/agents", protect, authorize("admin"), agents);

export default router;
