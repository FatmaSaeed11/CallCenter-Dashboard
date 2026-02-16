import asyncHandler from "../../common/helpers/asyncHandler.js";
import { ApiError } from "../../common/errors/ApiError.js";
import {  createCustomer,
getCustomers as getCustomersService ,findCustomerByPhone} from "./customer.service.js";



/*
  POST /customers
 Admin only usually
 */
export const createCustomerController= asyncHandler(async (req, res) => {

  const customer = await createCustomer(req.body);

  res.status(201).json({
    success: true,
    data: customer
  });
});


 //GET /customers
 
export const getAllCustomersController = asyncHandler(async (req, res) => {

  const customers = await getCustomersService();

  res.json({
    success: true,
    data: customers
  });
});


/*
 GET /customers/:phone
 Used heavily by agents during order creation
 */
export const getCustomerByPhoneController  = asyncHandler(async (req, res) => {

  const customer = await findCustomerByPhone(req.params.phone);

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  res.json({
    success: true,
    data: customer
  });
});
