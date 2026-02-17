import shopify from "./shopify.client.js";

/**
 * Create Shopify Customer
 */
export const createShopifyCustomer = async (customer) => {

  if (!customer?.phone) {
    throw new Error("Customer phone is required");
  }

  try {

    const res = await shopify.post("/customers.json", {
      customer: {
        first_name: customer.first_name || "Call",
        last_name: customer.last_name || "Center",
        phone: customer.phone,
        email: customer.email
      }
    });

    return res.data.customer;

  } catch (err) {

    console.error(
      "Shopify createCustomer error:",
      err.response?.data || err.message
    );

    throw new Error("Failed to create Shopify customer");
  }
};

/**
 * Get Product By SKU
 * Used by call center when agent enters SKU
 */
export const getProductBySKU = async (sku) => {

  if (!sku) {
    throw new Error("SKU is required");
  }

  try {

    /**
     * Shopify does NOT provide direct SKU search
     * So we fetch variants instead.
     *
     * NOTE:
     * For VERY large catalogs → move to GraphQL later.
     */

    const res = await shopify.get(
      `/variants.json?sku=${sku}&limit=1`
    );

    const variant = res.data.variants?.[0];

    if (!variant) {
      throw new Error("Product not found in Shopify");
    }

    return {
      productId: variant.product_id,
      variantId: variant.id,
      title: variant.title,
      price: Number(variant.price),
      inventory: variant.inventory_quantity
    };

  } catch (err) {

    console.error(
      "Shopify getProductBySKU error:",
      err.response?.data || err.message
    );

    throw new Error("Unable to fetch product from Shopify");
  }
};




/**
 * Create Shopify Order
 * Core call-center action
 */
export const createShopifyOrder = async ({
  variantId,
  quantity,
  customer
}) => {

  if (!variantId || !quantity) {
    throw new Error("Missing order data");
  }

  try {

    const res = await shopify.post("/orders.json", {
      order: {
        line_items: [
          {
            variant_id: variantId,
            quantity
          }
        ],

        customer: {
          first_name: customer?.first_name || "Call",
          last_name: customer?.last_name || "Center",
          phone: customer?.phone,
          email: customer?.email
        },

        financial_status: "pending",
        inventory_behaviour: "decrement_obeying_policy"
      }
    });

    return {
      shopifyOrderId: res.data.order.id,
      orderNumber: res.data.order.order_number,
      totalPrice: res.data.order.total_price,
      currency: res.data.order.currency
    };

  } catch (err) {

    console.error(
      "Shopify createOrder error:",
      err.response?.data || err.message
    );

    throw new Error("Shopify order creation failed");
  }
};
