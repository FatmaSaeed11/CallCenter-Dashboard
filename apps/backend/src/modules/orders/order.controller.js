import * as orderService from "./order.service.js";

export const createOrder = async (req, res) => {

    const order = await orderService.createOrder(
        req.body,
        req.user.id
    );

    res.status(201).json(order);
};



export const getOrders = async (req, res) => {

    const orders = await orderService.getOrders(
        req.user,
        req.query.agent
    );

    res.json(orders);
};



export const dashboard = async (req, res) => {

    const stats = await orderService.getDashboardStats();

    res.json(stats);
};
