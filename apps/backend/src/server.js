import dotenv from "dotenv";
dotenv.config();
console.log("JWT_ACCESS_SECRET =", process.env.JWT_ACCESS_SECRET);
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { connectDB } from "./config/db.js";

// Routes
import shopifyRoutes from "./integrations/shopify/shopify.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import customerRoutes from "./modules/customers/customer.routes.js";
import commissionRoutes from "./modules/commissions/commission.routes.js";
import productRoutes from "./modules/products/product.routes.js";

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
app.use("/webhooks/shopify", shopifyRoutes);
app.use(express.json());

/* HEALTH CHECK */
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/commissions", commissionRoutes);
app.use("/api/products", productRoutes);


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
