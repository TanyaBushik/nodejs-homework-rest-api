const express = require("express");
const { isValidId } = require("../../middleware/isValidId");

const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/user");

const router = express.Router();

// signup //
router.post("/register", isValidId(schemas.registerSchema), ctrl.register);

// signin //
router.post("/login", isValidId(schemas.loginSchema), ctrl.login);

module.exports = router;
