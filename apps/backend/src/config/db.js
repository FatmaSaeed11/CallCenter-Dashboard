import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    maxPoolSize: 20
  });

  console.log("✅ Mongo Connected");
};
