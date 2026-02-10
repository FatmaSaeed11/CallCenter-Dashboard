import express from "express";
import * as controller from "./product.controller.js";

// later add authorize(ROLES.ADMIN)

const router = express.Router();

router.post("/", controller.createProduct);
router.get("/", controller.getProducts);
router.patch("/:id", controller.updateProduct);
router.delete("/:id", controller.deactivateProduct);

export default router;
