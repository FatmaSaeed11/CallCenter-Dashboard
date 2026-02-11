import express from "express";
import * as controller from "./user.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const router = express.Router();


// 🔥 EVERYTHING below requires login
router.use(protect);


// 🔥 ADMIN ONLY
router.post("/", authorize("ADMIN"), controller.createUser);

router.get("/", authorize("ADMIN"), controller.getUsers);

router.get("/employees",
    authorize("ADMIN"),
    controller.getEmployees
);

router.patch("/:id",
    authorize("ADMIN"),
    controller.deactivateUser
);

export default router;

