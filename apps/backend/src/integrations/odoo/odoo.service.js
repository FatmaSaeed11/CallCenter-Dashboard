import { odooClient } from "./odoo.client.js";

export const createOdooCustomer = async (customer) => {

  const res = await odooClient.post("/jsonrpc", {
    jsonrpc: "2.0",
    method: "call",
    params: {
      name: customer.name,
      phone: customer.phone
    }
  });

  return res.data;
};
