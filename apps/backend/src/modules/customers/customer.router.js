import express from "express";
import {createCustomerController,getAllCustomersController,getCustomerByPhoneController} from "./customer.controller.js";

import { protect, adminGuard, roleGuard } from "../../middleware/auth.middleware.js";

export const customerRouter = express.Router();


// ALL routes require login
customerRouter.use(protect);


 //Admin creates customers manually
customerRouter.post(
  "/",
  adminGuard,
  createCustomerController
);


//Admin can list customers

customerRouter.get(
  "/",
  adminGuard,
  getAllCustomersController
);


//Agents NEED this for order flow
customerRouter.get(
  "/:phone",
  roleGuard(["ADMIN", "EMPLOYEE"]),
  getCustomerByPhoneController
);
