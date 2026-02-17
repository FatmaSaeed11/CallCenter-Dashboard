import Joi from "joi";

export const  createProductSchema = Joi.object({

  name: Joi.string()
    .min(2)
    .max(120)
    .required(),

  sku: Joi.string()
    .uppercase()
    .required(),

  price: Joi.number()
    .positive()
    .required(),

  vendor: Joi.string()
    .default("default"),

  stock: Joi.number()
    .min(0)
    .default(0)
});

export const updateProductSchema = createProductSchema
  .fork(
    ["name", "sku", "price", "vendor", "stock"],
    (field) => field.optional()
  )
  .min(1);
