import { z } from "zod";

export const updateOrderStatusValidator = z.object({
  status: z.enum(["NEW", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"])
});
