import * as orderService from "./order.service.js";
import * as shopifyService from "../../integrations/shopify/shopify.service.js";

import Order from "./order.model.js";
import asyncHandler from "../../common/helpers/asyncHandler.js";
import * as shopifyService from "../../integrations/shopify/shopify.service.js";

export const createOrder = asyncHandler(async (req, res) => {

  const { sku, quantity, customerId, productId } = req.body;

  // ✅ 1. Get product from Shopify
  const product = await shopifyService.getProductBySKU(sku);

  // ✅ 2. Create Shopify order
  const shopifyOrder = await shopifyService.createShopifyOrder({
    variantId: product.variantId,
    quantity,
    customer: {
      id: customerId
    }
  });

  // ✅ 3. Save locally (THIS IS WHERE externalIds GOES)
  const order = await Order.create({

    agent: req.userId,
    customer: customerId,

    items: [
      {
        product: productId, // your local product
        sku,
        quantity,
        price: product.price
      }
    ],

    totalAmount: product.price * quantity,

    externalIds: {
      shopify: shopifyOrder.id
    },

    syncStatus: "synced"
  });

  res.status(201).json({
    success: true,
    order
  });
});



export const getOrders = asyncHandler(async (req, res) => {

    const orders = await orderService.getOrders(
        req.user,
        req.query.agent
    );

    res.json({
        success: true,
        data: orders
    });
});


export const dashboard = asyncHandler(async (req, res) => {

    const stats = await orderService.getDashboardStats();

    res.json({
        success: true,
        data: stats
    });
});