import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    sku: String,
    quantity: Number,
    price: Number
});

const orderSchema = new mongoose.Schema({

    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
        index: true
    },

    items: {
        type: [orderItemSchema],
        required: true
    },

    totalAmount: {
        type: Number,
        required: true,
        index: true
    },

    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "completed",
        index: true
    },

    syncStatus: {
        type: String,
        enum: ["pending", "synced", "failed"],
        default: "pending",
        index: true
    }

}, { timestamps: true });


// 🔥 ENTERPRISE INDEXES (VERY IMPORTANT)
orderSchema.index({ agent: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("Order", orderSchema);
