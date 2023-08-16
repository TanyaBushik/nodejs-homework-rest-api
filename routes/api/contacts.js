const express = require("express");

const { isValidId } = require("../../middleware/isValidId");
const { addSchema, updateSchema } = require("../../schemas/contactsSchema");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getList);

router.get("/:id", ctrl.getById);

router.post("/", isValidId(addSchema), ctrl.add);

router.delete("/:id", ctrl.removeById);

router.put("/:id", isValidId(updateSchema), ctrl.updateById);

module.exports = router;
