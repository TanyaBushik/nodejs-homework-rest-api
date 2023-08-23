const express = require("express");

const { isValidId, authenticate } = require("../../middleware/isValidId");
const { getCurrent } = require("../../controllers/auth");
const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/user");

const router = express.Router();

// signup //
router.post("/register", isValidId(schemas.registerSchema), ctrl.register);

// signin //
router.post("/login", isValidId(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, getCurrent);

module.exports = router;
