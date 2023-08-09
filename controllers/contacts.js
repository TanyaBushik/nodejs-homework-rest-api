const contacts = require("../models/contacts");
const { NotFound } = require("http-errors");
const { ctrlWrapper } = require("../middleware");

const add = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: result,
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw new NotFound(`Contact with a such id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

const getList = async (req, res) => {
  const result = await contacts.getContactsList();
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContactById(id);
  if (!result) {
    throw new NotFound(`Contact with a such id=${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: "contact successfully deleted",
    data: result,
  });
};

const updateById = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new NotFound("Missing fields");
  }
  const { id } = req.params;
  const result = await contacts.updateContactById(id, req.body);
  if (!result) {
    throw new NotFound(`Contact with a such id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = {
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  getList: ctrlWrapper(getList),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
