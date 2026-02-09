import * as service from "./order.service.js";

export const create = async (req, res) => {
  const order = await service.createOrder(
    req.body,
    req.user._id
  );

  res.json(order);
};

export const list = async (req, res) => {

  const filter =
    req.user.role === "admin"
      ? {}
      : { agent: req.user._id };

  const orders = await service.getOrders(filter);

  res.json(orders);
};
