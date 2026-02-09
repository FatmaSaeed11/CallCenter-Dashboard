import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      unique: true, // prevents duplicate customers
      index: true
    },

    address: String,
    city: String,

    odooId: {
      type: Number,
      index: true
    },

    notes: String
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
