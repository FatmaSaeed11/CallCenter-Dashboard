import express from "express";
import * as controller from "./customer.controller.js";

const router = express.Router();

router.post("/", controller.createCustomer);
router.get("/", controller.getCustomers);
router.get("/:phone", controller.getCustomerByPhone);

export default router;
