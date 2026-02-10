import express from "express";
import * as controller from "./customer.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { ROLES } from "../../common/constants/roles.js";

const router = express.Router();


// ALL routes require login
router.use(protect);


/**
 * Admin creates customers manually
 */
router.post(
  "/",
  authorize(ROLES.ADMIN),
  controller.createCustomer
);


/**
 * Admin can list customers
 */
router.get(
  "/",
  authorize(ROLES.ADMIN),
  controller.getCustomers
);


/**
 * Agents NEED this for order flow
 */
router.get(
  "/:phone",
  authorize(ROLES.ADMIN, ROLES.EMPLOYEE),
  controller.getCustomerByPhone
);

export default router;
