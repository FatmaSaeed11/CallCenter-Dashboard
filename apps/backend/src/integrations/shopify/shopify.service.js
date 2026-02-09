import { shopifyClient } from "./shopify.client.js";

export const getProductBySKU = async (sku) => {

  const res = await shopifyClient.get(
    "/admin/api/2024-01/products.json"
  );

  const variant = res.data.products
    .flatMap(p => p.variants)
    .find(v => v.sku === sku);

  return variant;
};
