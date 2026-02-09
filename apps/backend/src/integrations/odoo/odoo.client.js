import axios from "axios";

export const odooClient = axios.create({
  baseURL: process.env.ODOO_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
