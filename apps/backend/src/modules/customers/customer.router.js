import express from "express";
import {createCustomerController,getAllCustomersController,getCustomerByPhoneController} from "./customer.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { ROLES } from "../../common/constants/roles.js";

export const customerRouter = express.Router();


// ALL routes require login
customerRouter.use(protect);


 //Admin creates customers manually
customerRouter.post(
  "/",
  authorize(ROLES.ADMIN),
  createCustomerController
);


//Admin can list customers

customerRouter.get(
  "/",
  authorize(ROLES.ADMIN),
  getAllCustomersController
);


//Agents NEED this for order flow
customerRouter.get(
  "/:phone",
  authorize(ROLES.ADMIN, ROLES.EMPLOYEE),
  getCustomerByPhoneController
);
