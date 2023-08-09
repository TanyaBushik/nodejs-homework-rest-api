const contacts = require("../models/contacts");
const { ctrlWrapper, HttpError } = require("../middleware/");

const add = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with a such id=${id} not found`);
  }
  res.status(200).json(result);
};

const getList = async (req, res) => {
  const result = await contacts.getContactsList();
  res.status(200).json(result);
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with a such id=${id} not found`);
  }
  res.status(200).json({ message: "contact successfully deleted" });
};

const updateById = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(404, "Missing fields");
  }
  const { id } = req.params;
  const result = await contacts.updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with a such id=${id} not found`);
  }
  res.status(200).json(result);
};

module.exports = {
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  getList: ctrlWrapper(getList),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
