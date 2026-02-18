import dotenv from "dotenv";
dotenv.config();
console.log("JWT_ACCESS_SECRET =", process.env.JWT_ACCESS_SECRET);
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { connectDB } from "./config/db.js";

// Routes
import {shopifyRouter} from "./integrations/shopify/shopify.router.js";
import {authRouter} from "./modules/auth/auth.router.js";
import {orderRouter} from "./modules/orders/order.router.js";
import {userRouter} from "./modules/users/user.router.js";
import {customerRouter} from "./modules/customers/customer.router.js";
import {commissionRouter} from "./modules/commissions/commission.router.js";
import {productRouter} from "./modules/products/product.router.js";

// Middleware
import { errorHandler } from "./middleware/error.middleware.js";
console.log("✅ CORRECT SERVER FILE IS RUNNING");

const app = express();

/* SECURITY */
app.set("trust proxy", 1);

app.use(cors());
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "10kb" }));
app.use("/webhooks/shopify", express.raw({ type: "application/json" }));
app.use("/webhooks/shopify", shopifyRouter);

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ROUTES */
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/customers", customerRouter);
app.use("/api/commissions", commissionRouter);
app.use("/api/products", productRouter);


/* 404 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ERROR */
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();