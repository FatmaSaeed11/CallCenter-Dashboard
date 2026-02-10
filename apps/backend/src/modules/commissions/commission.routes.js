import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import * as controller from "./commission.controller.js";
import { ROLES } from "../../common/constants/roles.js";

const router = express.Router();

router.use(protect);

/*
   Employee
*/
router.get(
  "/me",
  authorize(ROLES.EMPLOYEE, ROLES.ADMIN),
  controller.myCommissions
);

/*
   Admin
*/
router.get(
  "/",
  authorize(ROLES.ADMIN),
  controller.allCommissions
);

router.get(
  "/summary",
  authorize(ROLES.ADMIN),
  controller.commissionSummary
);

export default router;
