const router = require("express").Router();

const controller = require("./user.controller");

const protect = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");


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

module.exports = router;

