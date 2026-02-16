import {createProduct as createProductService,getProducts as getProductsService ,updateProduct as updateProductService,deactivateProduct as deactivateProductService} from "./product.service.js";
import { createProductSchema } from "./product.validatior.js";


// CREATE
export const createProduct = async (req, res) => {
  const product = await createProductService(req.body);

  res.status(201).json({
    success: true,
    data: product
  });
};


// GET
export const getProducts = async (req, res) => {
  try {

    const products =
      await getProductsService();

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
      await updateProductService(
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
      await deactivateProductService(
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
