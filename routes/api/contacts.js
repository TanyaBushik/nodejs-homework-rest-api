const express = require("express");

const validation = require("../../middleware/validation");
const { addSchema, updateSchema } = require("../../schemas/contactsSchema");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getList);

router.get("/:id", ctrl.getById);

router.post("/", validation(addSchema), ctrl.add);

router.delete("/:id", ctrl.removeById);

router.put("/:id", validation(updateSchema), ctrl.updateById);

module.exports = router;
