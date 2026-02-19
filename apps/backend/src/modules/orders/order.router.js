import express from "express";
import { protect, adminGuard, roleGuard } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.js";
import { createOrder, dashboard, listOrders, myOrders, updateOrderStatus } from "./order.controller.js";
import { updateOrderStatusValidator } from "./order.validator.js";

export const orderRouter = express.Router();

orderRouter.use(protect);

// Employee + Admin
orderRouter.post(
  "/",
  roleGuard(["ADMIN", "EMPLOYEE"]),
  createOrder
);

orderRouter.get(
  "/my",
  roleGuard(["EMPLOYEE"]),
  myOrders
);

// Admin only
orderRouter.get(
  "/",
  adminGuard,
  listOrders
);

orderRouter.get(
  "/dashboard",
  adminGuard,
  dashboard
);

orderRouter.put(
  "/:id/status",
  adminGuard,
  validate(updateOrderStatusValidator),
  updateOrderStatus
);
