import mongoose from "mongoose";
import Order from "./order.model.js";
import {ensureCustomer} from "../customers/customer.service.js";
import { createCommission } from "../commissions/commission.service.js";
import { ROLES } from "../../common/constants/roles.js";
import { findBySku } from "../products/product.service.js";


// CREATE ORDER — ENTERPRISE SAFE

export const createOrder = async (payload, agentId) => {

    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const { sku, quantity, customer } = payload;

        //  Strong validation
        if (!sku || !quantity || quantity <= 0) {
            throw new Error("Valid SKU and quantity required");
        }

        // CLEAN ARCHITECTURE — use product service
        const product = await findBySku(sku, session);


        //  Ensure customer INSIDE transaction
        const syncedCustomer =
            await ensureCustomer(customer, session);

        const totalAmount = product.price * quantity;

        //  Create order
        const [order] = await Order.create([{
            agent: agentId,
            customer: syncedCustomer._id,
            items: [{
                product: product._id,
                sku: product.sku, // always trust DB value
                quantity,
                price: product.price
            }],
            totalAmount,
            status: "pending",
            syncStatus: "pending"
        }], { session });


        //  Commission INSIDE transaction
        await createCommission({
            employeeId: agentId,
            orderId: order._id,
            items: order.items,
            vendor: product.vendor || "default"
        }, session);


        //  Commit FIRST
        await session.commitTransaction();

        //  NEVER run integrations inside transaction
        await integrationWorker.addIntegrationJob(order);

        return order;

    } catch (err) {

        await session.abortTransaction();
        throw err;

    } finally {

        session.endSession();
    }
};


// GET ORDERS

export const getOrders = async (user, agentFilter) => {

    let filter = {};

    // Employee sees ONLY their orders
    if (user.role === ROLES.EMPLOYEE) {
        filter.agent = user._id;
    }

    // Admin filtering
    if (agentFilter && user.role === ROLES.ADMIN) {
        filter.agent = agentFilter;
    }

    return Order.find(filter)
        .populate("agent", "name")
        .populate("customer", "name phone")
        .sort({ createdAt: -1 })
        .lean(); // big performance boost
};



// ENTERPRISE DASHBOARD

export const getDashboardStats = async () => {

    const stats = await Order.aggregate([
        {
            $group: {
                _id: null,
                revenue: { $sum: "$totalAmount" },
                totalOrders: { $sum: 1 },
                avgOrderValue: { $avg: "$totalAmount" }
            }
        }
    ]);

    return stats[0] || {
        revenue: 0,
        totalOrders: 0,
        avgOrderValue: 0
    };
};
