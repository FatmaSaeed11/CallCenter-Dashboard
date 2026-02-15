import Product from "./product.model.js";

// CREATE PRODUCT
export const createProduct = async (data) => {

  if (!data.sku) {
    throw new Error("SKU is required");
  }

  const normalizedSku = data.sku.toUpperCase();

  const existing = await Product.findOne({
    sku: normalizedSku
  });

  if (existing) {
    throw new Error("Product with this SKU already exists.");
  }

  return Product.create({
    ...data,
    sku: normalizedSku
  });
};


// GET ACTIVE PRODUCTS (FAST)
export const getProducts = async () => {

  return Product.find({
    isActive: true
  })
    .lean() // huge performance
    .sort({ createdAt: -1 });
};




// ENTERPRISE — TRANSACTION SAFE LOOKUP
// Used by ORDER SERVICE

export const findBySku = async (sku, session = null) => {

  if (!sku) {
    throw new Error("SKU is required");
  }

  const query = Product.findOne({
    sku: sku.toUpperCase(),
    isActive: true
  });

  // Attach transaction if provided
  if (session) {
    query.session(session);
  }

  const product = await query;

  if (!product) {
    throw new Error(
      "Product not found or inactive. Sync products first."
    );
  }

  return product;
};


// UPDATE PRODUCT
export const updateProduct = async (id, data) => {

  // Prevent accidental SKU casing issues
  if (data.sku) {
    data.sku = data.sku.toUpperCase();
  }

  const product = await Product.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};



// SOFT DELETE (Never hard delete revenue)

export const deactivateProduct = async (id) => {

  const product = await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};
