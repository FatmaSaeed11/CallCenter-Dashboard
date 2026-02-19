import express from "express";
import {createProduct,getProducts,updateProduct,deactivateProduct}  from "./product.controller.js";
import { protect, adminGuard } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.js";
import { createProductSchema,updateProductSchema } from "./product.validator.js";

export const productRouter = express.Router();

productRouter.use(protect);
productRouter.use(adminGuard);

productRouter.post("/",validate(createProductSchema), createProduct);
productRouter.get("/", getProducts);
productRouter.patch("/:id", validate(updateProductSchema), updateProduct);
productRouter.delete("/:id", deactivateProduct);
