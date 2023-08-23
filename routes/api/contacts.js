const express = require("express");

const { isValidId, authenticate } = require("../../middleware");
const { addSchema, updateSchema } = require("../../schemas/contactsSchema");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", authenticate, ctrl.getList);

router.get("/:id", authenticate, ctrl.getById);

router.post("/", authenticate, isValidId(addSchema), ctrl.add);

router.delete("/:id", authenticate, ctrl.removeById);

router.put("/:id", authenticate, isValidId(updateSchema), ctrl.updateById);

module.exports = router;
