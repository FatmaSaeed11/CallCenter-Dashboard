import express from "express";
import { protect, adminGuard, roleGuard } from "../../middleware/auth.middleware.js";
import {myCommissions,allCommissions,commissionSummary} from "./commission.controller.js";

export const commissionRouter = express.Router();

commissionRouter.use(protect);


  // Employee
commissionRouter.get(
  "/me",
  roleGuard(["EMPLOYEE", "ADMIN"]),
  myCommissions
);

  // Admin

commissionRouter.get(
  "/",
  adminGuard,
  allCommissions
);

commissionRouter.get(
  "/summary",
  adminGuard,
  commissionSummary
);
