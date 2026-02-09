import * as customerService from "./customer.service.js";

/**
 * POST /customers
 */
export const createCustomer = async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body);

    res.status(201).json({
      success: true,
      data: customer
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * GET /customers
 */
export const getCustomers = async (req, res) => {
  try {
    const customers = await customerService.getCustomers();

    res.json({
      success: true,
      data: customers
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * GET /customers/:phone
 */
export const getCustomerByPhone = async (req, res) => {
  try {
    const customer = await customerService.findCustomerByPhone(
      req.params.phone
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found"
      });
    }

    res.json({
      success: true,
      data: customer
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
