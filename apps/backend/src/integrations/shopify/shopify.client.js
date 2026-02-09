import axios from "axios";

export const shopifyClient = axios.create({
  baseURL: process.env.SHOPIFY_URL,
  headers: {
    "X-Shopify-Access-Token": process.env.SHOPIFY_TOKEN
  }
});
