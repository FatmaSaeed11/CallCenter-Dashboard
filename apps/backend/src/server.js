import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import "./config/env.js";
import { connectDB } from "./config/db.js";

import authRoutes from "./modules/auth/auth.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import userRoutes from "./modules/users/user.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";
import customerRoutes from "./modules/customers/customer.routes.js";

const app = express();

connectDB();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);
app.use("/api/customers", customerRoutes);

app.listen(5000, () =>
  console.log("🚀 Server running on port 5000")
);
