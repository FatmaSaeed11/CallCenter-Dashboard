import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  sku: String,
  name: String,
  price: Number,
  quantity: Number,
  commission: Number
});

const orderSchema = new mongoose.Schema({
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  },

  customerName: String,
  phone: String,

  items: [itemSchema],

  totalAmount: Number,
  totalCommission: Number,

  status: {
    type: String,
    default: "completed"
  }
},
{ timestamps: true });

export default mongoose.model("Order", orderSchema);
