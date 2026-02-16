import { z } from "zod";
import { ROLES } from "../../common/constants/roles.js";

export const createUserValidator = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters"),

    email: z
        .string()
        .email("Invalid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    role: z
        .enum([ROLES.ADMIN, ROLES.EMPLOYEE])
});

export const updateUserValidator = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum([ROLES.ADMIN, ROLES.EMPLOYEE]).optional()
});