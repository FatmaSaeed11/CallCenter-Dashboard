import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { createOrder, getOrders, dashboard, listOrders } from "./order.controller.js";

import { ROLES } from "../../common/constants/roles.js"; 

export const router = express.Router();

router.use(protect);

// Employee + Admin
router.post(
  "/",
  authorize(ROLES.ADMIN, ROLES.EMPLOYEE),
  createOrder
);

// Admin only
router.get(
  "/",
  authorize(ROLES.ADMIN),
  listOrders
);

router.get(
  "/dashboard",
  authorize(ROLES.ADMIN),
  dashboard
);