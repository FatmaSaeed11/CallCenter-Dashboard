import express from "express";
import {createUser,getUsers,getEmployees,getUserById,updateUser,deactivateUser} from "./user.controller.js";

import { protect, adminGuard } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.js";

import {
    createUserValidator,
    updateUserValidator
} from "./user.validator.js";

export const userRouter = express.Router();


//  EVERYTHING below requires login
userRouter.use(protect);

userRouter.use(adminGuard);

//  ADMIN ONLY
userRouter.post(
   "/",
   validate(createUserValidator),
   createUser
);

userRouter.get("/", getUsers);

userRouter.get("/employees",
    getEmployees
);

userRouter.get("/:id",
    getUserById
);

userRouter.put("/:id",
    validate(updateUserValidator),
    updateUser
);

userRouter.delete("/:id",
    deactivateUser
);


