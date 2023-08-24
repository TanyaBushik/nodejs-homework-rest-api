const express = require("express");

const { authenticate } = require("../../middleware");
const { getCurrent } = require("../../controllers/auth");
const ctrl = require("../../controllers/auth");

const router = express.Router();

// signup //
router.post("/register", ctrl.register);

// signin //
router.post("/login", ctrl.login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/users", authenticate, ctrl.updateSubscription);

module.exports = router;
