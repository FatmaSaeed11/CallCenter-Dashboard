import express from "express";
import {createUser,getUsers,getEmployees,deactivateUser} from "./user.controller.js";

import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { validate } from "../../middleware/validate.js";
import { ROLES } from "../../common/constants/roles.js";

import {
    createUserValidator,
    updateUserValidator
} from "./user.validator.js";

export const userRouter = express.Router();


//  EVERYTHING below requires login
userRouter.use(protect);

userRouter.use(authorize(ROLES.ADMIN));

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

userRouter.patch("/:id",
    validate(updateUserValidator),
    deactivateUser
);


