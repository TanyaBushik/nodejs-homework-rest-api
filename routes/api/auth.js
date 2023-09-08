const express = require("express");

const { authenticate, upload } = require("../../middleware");
// const { getCurrent } = require("../../controllers/auth");
const ctrl = require("../../controllers/auth");

const router = express.Router();

// signup //
router.post("/register", ctrl.register);

router.get("/verify/:verificationCode", ctrl.verifyEmail);

router.post("/verify", ctrl.resendVerifyEmail);

// signin //
router.post("/login", ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/users", authenticate, ctrl.updateSubscription);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
