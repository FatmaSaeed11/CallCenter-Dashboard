import mongoose from "mongoose";

const commissionSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true, // one commission per order
      index: true
    },

    amount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "REVERSED"],
      default: "PENDING",
      index: true
    },

    itemsCount: Number,

    vendor: String // optional if you track vendor performance
  },
  { timestamps: true }
);

export default mongoose.model("Commission", commissionSchema);
