import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
  name: String,
  email: { type: String, unique: true, index: true },
  password: { type: String, select: false },
  role: {
    type: String,
    enum: ["admin", "agent"],
    default: "agent",
    index: true
  }
},
{ timestamps: true }
);

export default mongoose.model("User", userSchema);
