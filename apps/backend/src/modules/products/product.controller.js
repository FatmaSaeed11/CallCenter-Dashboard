import {createProduct,getProducts,updateProduct,deactivateProduct} from "./product.service.js";
import { createProductSchema } from "./product.validatior.js";


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
      await createProduct(value);

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
      await getProducts();

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
      await updateProduct(
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
      await deactivateProduct(
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
