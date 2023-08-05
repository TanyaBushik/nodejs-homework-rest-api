const getList = require("./getList");

const getById = async (contactId) => {
  const contacts = await getList();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

module.exports = getById;
