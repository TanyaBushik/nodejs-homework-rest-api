const Contact = require("../models/contacts");

const { ctrlWrapper, HttpError } = require("../helpers");
const schemas = require("../schemas/contactsSchema");

const getList = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const add = async (req, res) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with a such id=${id} not found`);
  }
  res.status(200).json(result);
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, `Contact with a such id=${id} not found`);
  }
  res.status(200).json({ message: "Contact successfully deleted" });
};

const updateById = async (req, res) => {
  const { error } = schemas.updateSchema.validate(req.body);
  const { id } = req.params;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(404, "Missing fields");
  }

  if (error) {
    throw HttpError(404, `Contact with a such id=${id} not found`);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { error } = schemas.updateFavouriteSchema.validate(req.body);
  const { id } = req.params;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Missing fields");
  }
  if (error) {
    throw HttpError(404, `Contact with a such id=${id} not found`);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

module.exports = {
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  getList: ctrlWrapper(getList),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
