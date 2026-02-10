import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },

  sku: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    index: true
  },

  price: {
    type: Number,
    required: true,
    min: 0,
    index: true
  },

  vendor: {
    type: String,
    default: "default",
    index: true
  },

  stock: {
    type: Number,
    default: 0
  },

  shopifyId: Number,
  odooId: Number,

  isActive: {
    type: Boolean,
    default: true,
    index: true
  }

}, { timestamps: true });


// 🔥 Compound index for fast dashboards
productSchema.index({
  vendor: 1,
  isActive: 1
});

export default mongoose.model("Product", productSchema);

