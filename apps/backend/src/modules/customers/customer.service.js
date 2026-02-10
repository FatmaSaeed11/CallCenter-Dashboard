import Customer from "./customer.model.js";
import { createOdooCustomer } from "../../integrations/odoo/odoo.service.js";
import { normalizePhone } from "../../common/utils/normalizePhone.js";


/**
 * Find customer by phone
 */
export const findCustomerByPhone = async (phone) => {

  const normalizedPhone = normalizePhone(phone);

  return Customer.findOne({
    phone: normalizedPhone
  });
};




/**
 * ENTERPRISE — Transaction Safe
 * Used inside ORDER transactions
 */
export const ensureCustomer = async (data, session) => {

  if (!data.phone) {
    throw new Error("Customer phone is required");
  }

  // ✅ Normalize FIRST
  data.phone = normalizePhone(data.phone);

  let customer = await Customer.findOne({
    phone: data.phone
  }).session(session);

  if (customer) return customer;

  // Try Odoo (BUT do not block DB transaction)
  let odooId = null;

  try {
    const odooCustomer = await createOdooCustomer(data);
    odooId = odooCustomer?.id || null;
  } catch (err) {

    console.error("Odoo customer creation failed:", err.message);

    /**
     * Enterprise behavior:
     * NEVER fail financial transaction because of ERP downtime
     */
  }

  const [newCustomer] = await Customer.create([{
    ...data,
    odooId
  }], { session });

  return newCustomer;
};




/**
 * Standalone creation (Admin / imports)
 */
export const createCustomer = async (data) => {

  if (!data.phone) {
    throw new Error("Customer phone is required");
  }

  // ✅ Normalize BEFORE lookup
  data.phone = normalizePhone(data.phone);

  const existing = await Customer.findOne({
    phone: data.phone
  });

  if (existing) return existing;

  let odooId = null;

  try {
    const odooCustomer = await createOdooCustomer(data);
    odooId = odooCustomer?.id || null;
  } catch (err) {

    console.error("Odoo error:", err.message);

    // Never block revenue
  }

  return Customer.create({
    ...data,
    odooId
  });
};




/**
 * Get all customers
 */
export const getCustomers = async () => {
  return Customer.find()
    .sort({ createdAt: -1 })
    .lean(); // performance
};
