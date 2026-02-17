import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import {myCommissions,allCommissions,commissionSummary} from "./commission.controller.js";

import { ROLES } from "../../common/constants/roles.js";

export const commissionRouter = express.Router();

commissionRouter.use(protect);


  // Employee
commissionRouter.get(
  "/me",
  authorize(ROLES.EMPLOYEE, ROLES.ADMIN),
  myCommissions
);

  // Admin

commissionRouter.get(
  "/",
  authorize(ROLES.ADMIN),
  allCommissions
);

commissionRouter.get(
  "/summary",
  authorize(ROLES.ADMIN),
  commissionSummary
);
