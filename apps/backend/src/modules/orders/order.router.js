import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { createOrder, listOrders, dashboard } from "./order.controller.js";

import { ROLES } from "../../common/constants/roles.js"; 

export const orderRouter = express.Router();

orderRouter.use(protect);

// Employee + Admin
orderRouter.post(
  "/",
  authorize(ROLES.ADMIN, ROLES.EMPLOYEE),
  createOrder
);

// Admin only
orderRouter.get(
  "/",
  authorize(ROLES.ADMIN),
  listOrders
);

orderRouter.get(
  "/dashboard",
  authorize(ROLES.ADMIN),
  dashboard
);