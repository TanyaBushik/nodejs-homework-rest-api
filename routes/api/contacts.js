const express = require("express");

const validation = require("../../middleware");
const schemas = require("../../schemas/");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getList);

router.get("/:id", ctrl.getById);

router.post("/", validation(schemas.addSchema), ctrl.add);

router.delete("/:id", ctrl.removeById);

router.put("/:id", validation(schemas.updateSchema), ctrl.updateById);

module.exports = router;
