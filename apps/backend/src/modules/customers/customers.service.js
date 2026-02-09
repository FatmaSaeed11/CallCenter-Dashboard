import Customer from "./customer.model.js";
import { createOdooCustomer } from "../../services/odoo.js";

/**
 * Find customer by phone
 */
export const findCustomerByPhone = async (phone) => {
  return Customer.findOne({ phone });
};

/**
 * Create customer locally + Odoo
 */
export const createCustomer = async (data) => {
  // Check if exists
  const existing = await Customer.findOne({ phone: data.phone });

  if (existing) return existing;

  // Create in Odoo FIRST
  let odooCustomer;

  try {
    odooCustomer = await createOdooCustomer(data);
  } catch (err) {
    console.error("Odoo error:", err.message);
    // Enterprise behavior:
    // do NOT block order if Odoo fails
  }

  const customer = await Customer.create({
    ...data,
    odooId: odooCustomer?.id || null
  });

  return customer;
};

/**
 * Get all customers
 */
export const getCustomers = async () => {
  return Customer.find().sort({ createdAt: -1 });
};
