import express from "express";
import {createProduct,getProducts,updateProduct,deactivateProduct}  from "./product.controller.js";

// later add authorize(ROLES.ADMIN)

export const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deactivateProduct);
