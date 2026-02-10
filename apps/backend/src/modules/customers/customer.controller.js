import asyncHandler from "../../common/helpers/asyncHandler.js";
import { ApiError } from "../../common/errors/ApiError.js";
import * as customerService from "./customer.service.js";



/**
 * POST /customers
 * Admin only usually
 */
export const createCustomer = asyncHandler(async (req, res) => {

  const customer = await customerService.createCustomer(req.body);

  res.status(201).json({
    success: true,
    data: customer
  });
});



/**
 * GET /customers
 */
export const getCustomers = asyncHandler(async (req, res) => {

  const customers = await customerService.getCustomers();

  res.json({
    success: true,
    data: customers
  });
});



/**
 * GET /customers/:phone
 * Used heavily by agents during order creation
 */
export const getCustomerByPhone = asyncHandler(async (req, res) => {

  const customer =
    await customerService.findCustomerByPhone(req.params.phone);

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  res.json({
    success: true,
    data: customer
  });
});
