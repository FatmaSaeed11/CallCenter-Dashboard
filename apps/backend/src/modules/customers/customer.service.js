import Customer from "./customer.model.js";
import { createShopifyCustomer } from "../../integrations/shopify/shopify.service.js";
import { normalizePhone } from "../../common/utils/normalizePhone.js";
import { ApiError } from "../../common/errors/ApiError.js";


//Find customer by phone

export const findCustomerByPhone = async (phone) => {

  const normalizedPhone = normalizePhone(phone);

  return Customer.findOne({
    phone: normalizedPhone
  }).lean();
};

/*
  ENTERPRISE — Transaction Safe
  Used inside ORDER transactions
 */
export const ensureCustomer = async (data, session) => {

  if (!data.phone) {
    throw new ApiError(400, "Customer phone is required");
  }

  // Normalize FIRST
  data.phone = normalizePhone(data.phone);

  let customer = await Customer.findOne({
    phone: data.phone
  }).session(session);

  if (customer) return customer;

  // Try Shopify (BUT do not block DB transaction)
  let shopifyId = null;

  try {
    const shopifyCustomer = await createShopifyCustomer(data);
    shopifyId = shopifyCustomer?.id || null;
  } catch (err) {

    console.error("Shopify customer creation failed:", err.message);

    /*
      Enterprise behavior:
      NEVER fail financial transaction because of ERP downtime
     */
  }

  const [newCustomer] = await Customer.create([{
    ...data,
    shopifyId
  }], { session });

  return newCustomer;
};




//Standalone creation (Admin / imports)
 
export const createCustomer  = async (data) => {

  if (!data.phone) {
    throw new ApiError(400, "Customer phone is required");
  }

  // Normalize BEFORE lookup
  data.phone = normalizePhone(data.phone);

  const existing = await Customer.findOne({
    phone: data.phone
  });

  if (existing) return existing;

  let shopifyId = null;

  try {
    const shopifyCustomer = await createShopifyCustomer(data);
    shopifyId = shopifyCustomer?.id || null;
  } catch (err) {

    console.error("Shopify error:", err.message);

    // Never block revenue
  }

  return Customer.create({
    ...data,
    shopifyId
  });
};



 // Get all customers
export const getCustomers  = async () => {
  return Customer.find()
    .sort({ createdAt: -1 })
    .lean(); // performance
};
