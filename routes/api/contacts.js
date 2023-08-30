const express = require("express");

const { isValidId, authenticate } = require("../../middleware");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", authenticate, ctrl.getList);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, ctrl.add);

router.patch("/:id/favorite", authenticate, isValidId, ctrl.updateFavorite);

router.put("/:id", authenticate, isValidId, ctrl.updateById);

router.delete("/:id", authenticate, isValidId, ctrl.removeById);

module.exports = router;
