import * as productService from "./product.service.js";
import { createProductSchema } from "./product.validation.js";


// CREATE
export const createProduct = async (req, res) => {
  try {

    const { error, value } =
      createProductSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    const product =
      await productService.createProduct(value);

    res.status(201).json({
      success: true,
      data: product
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



// GET
export const getProducts = async (req, res) => {
  try {

    const products =
      await productService.getProducts();

    res.json({
      success: true,
      data: products
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



// UPDATE
export const updateProduct = async (req, res) => {
  try {

    const product =
      await productService.updateProduct(
        req.params.id,
        req.body
      );

    res.json({
      success: true,
      data: product
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



// DELETE (SOFT)
export const deactivateProduct = async (req, res) => {
  try {

    const product =
      await productService.deactivateProduct(
        req.params.id
      );

    res.json({
      success: true,
      data: product
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
