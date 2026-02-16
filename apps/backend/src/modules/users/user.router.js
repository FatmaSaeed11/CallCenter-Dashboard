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

export const router = express.Router();


//  EVERYTHING below requires login
router.use(protect);

router.use(authorize(ROLES.ADMIN));

//  ADMIN ONLY
router.post(
   "/",
   validate(createUserValidator),
   createUser
);

router.get("/", getUsers);

router.get("/employees",
    getEmployees
);

router.patch("/:id",
    validate(updateUserValidator),
    deactivateUser
);


