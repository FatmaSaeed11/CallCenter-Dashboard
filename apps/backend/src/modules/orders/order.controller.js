import {getOrders,getDashboardStats} from "./order.service.js";
import {getProductBySKU,createShopifyOrder} from "../../integrations/shopify/shopify.service.js";
import Order from "./order.model.js";
import asyncHandler from "../../common/helpers/asyncHandler.js";

export const createOrder = asyncHandler(async (req, res) => {

  const { sku, quantity, customerId, productId } = req.body;

  const product = await getProductBySKU(sku);

  const shopifyOrder = await createShopifyOrder({
    variantId: product.variantId,
    quantity,
    customer: { id: customerId }
  });

  const order = await Order.create({
    agent: req.userId,
    customer: customerId,
    items: [
      {
        product: productId,
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

  const orders = await getOrders(
    req.user,
    req.query.agent
  );

  res.json({
    success: true,
    data: orders
  });
});

export const dashboard = asyncHandler(async (req, res) => {

  const stats = await getDashboardStats();

  res.json({
    success: true,
    data: stats
  });
});
