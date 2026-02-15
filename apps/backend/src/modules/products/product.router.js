import express from "express";
import {createProduct,getProducts,updateProduct,deactivateProduct}  from "./product.controller.js";

// later add authorize(ROLES.ADMIN)

export const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.patch("/:id", updateProduct);
router.delete("/:id", deactivateProduct);
