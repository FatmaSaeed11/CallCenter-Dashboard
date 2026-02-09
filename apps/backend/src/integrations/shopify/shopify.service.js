import axios from "axios";

export const getProductBySKU = async (sku) => {

  const res = await axios.get(
    `${process.env.SHOPIFY_URL}/admin/api/2024-01/products.json`,
    {
      headers: {
        "X-Shopify-Access-Token":
          process.env.SHOPIFY_TOKEN
      }
    }
  );

  const product = res.data.products
    .flatMap(p => p.variants)
    .find(v => v.sku === sku);

  return product;
};
