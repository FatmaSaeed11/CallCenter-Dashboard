import {getOrders,getDashboardStats,updateOrderStatus as updateOrderStatusService} from "./order.service.js";
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
    agent: req.user.id,
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

export const listOrders = asyncHandler(async (req, res) => {

  const orders = await getOrders(
    req.user,
    req.query.agent
  );

  res.json({
    success: true,
    data: orders
  });
});

export const myOrders = asyncHandler(async (req, res) => {
  const orders = await getOrders(
    { id: req.user.id, role: req.user.role }
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

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await updateOrderStatusService(req.params.id, req.body.status);

  res.json({
    success: true,
    data: order
  });
});
