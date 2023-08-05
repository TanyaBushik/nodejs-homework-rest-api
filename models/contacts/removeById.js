const getList = require("./getList");
const updateContacts = require("./updateContacts");

const removeById = async (contactId) => {
  const contacts = await getList();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result || null;
};

module.exports = removeById;
