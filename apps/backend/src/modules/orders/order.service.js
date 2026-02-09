import Order from "./order.model.js";

export const createOrder = async (data, agentId) => {

  const totalAmount =
    data.items.reduce((s, i) => s + i.price * i.quantity, 0);

  const totalCommission =
    data.items.reduce((s, i) => s + i.commission * i.quantity, 0);

  return Order.create({
    ...data,
    agent: agentId,
    totalAmount,
    totalCommission
  });
};

export const getOrders = (query) =>
  Order.find(query).populate("agent", "name");
