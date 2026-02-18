import express from "express";
import {createProduct,getProducts,updateProduct,deactivateProduct}  from "./product.controller.js";
import { validate } from "../../middleware/validate.js";
import { createProductSchema,updateProductSchema } from "./product.validator.js";

// later add authorize(ROLES.ADMIN)

export const productRouter = express.Router();

productRouter.post("/",validate(createProductSchema), createProduct);
productRouter.get("/", getProducts);
productRouter.patch("/:id", validate(updateProductSchema), updateProduct);
productRouter.delete("/:id", deactivateProduct);
