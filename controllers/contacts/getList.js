const contactsOperations = require("../../models");

const getList = async (req, res) => {
  const contacts = await contactsOperations.getList();
  res.json({
    status: "success",
    code: 200,
    data: contacts,
  });
};

module.exports = getList;
