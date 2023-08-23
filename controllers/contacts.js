const Contact = require("../models/contacts");

const { ctrlWrapper, HttpError } = require("../helpers");
const schemas = require("../schemas/contactsSchema");

const getList = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner, ...(favorite !== undefined && { favorite }) },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "subscription email");
  res.status(200).json(result);
};

const add = async (req, res) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Contact with a such id=${id} not found`);
  }
  res.status(200).json(result);
};

const removeById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndRemove({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Contact with a such id=${id} not found`);
  }
  res.status(200).json({ message: "Contact successfully deleted" });
};

const updateById = async (req, res) => {
  const { error } = schemas.updateSchema.validate(req.body);
  const { id } = req.params;
  const { _id: owner } = req.user;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(404, "Missing fields");
  }

  if (error) {
    throw HttpError(404, `Contact with a such id=${id} not found`);
  }
  const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { error } = schemas.updateFavouriteSchema.validate(req.body);
  const { id } = req.params;
  const { _id: owner } = req.user;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Missing fields");
  }
  if (error) {
    throw HttpError(404, `Contact with a such id=${id} not found`);
  }
  const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });

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
