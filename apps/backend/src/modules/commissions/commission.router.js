import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import {myCommissions,allCommissions,commissionSummary} from "./commission.controller.js";

import { ROLES } from "../../common/constants/roles.js";

export const router = express.Router();

router.use(protect);


  // Employee
router.get(
  "/me",
  authorize(ROLES.EMPLOYEE, ROLES.ADMIN),
  myCommissions
);

  // Admin

router.get(
  "/",
  authorize(ROLES.ADMIN),
  allCommissions
);

router.get(
  "/summary",
  authorize(ROLES.ADMIN),
  commissionSummary
);
