import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import * as controller from "./order.controller.js";

import { ROLES } from "../../common/constants/roles.js"; // ✅ HERE


const router = express.Router();

router.use(protect);

// Employee + Admin
router.post(
  "/",
  authorize(ROLES.ADMIN, ROLES.EMPLOYEE),
  controller.createOrder
);

// Admin only
router.get(
  "/",
  authorize(ROLES.ADMIN),
  controller.getOrders
);

router.get(
  "/dashboard",
  authorize(ROLES.ADMIN),
  controller.dashboard
);

export default router;
