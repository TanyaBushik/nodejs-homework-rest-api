const contactsOperations = require("../../models");
const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.getById(contactId);
  if (!result) {
    throw new NotFound(`Contact with a such id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = getById;
