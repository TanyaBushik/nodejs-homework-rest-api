const getList = require("./getList");
const updateContacts = require("./updateContacts");

const updateById = async (id, data) => {
  const contacts = await getList();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) return null;
  contacts[index] = { id, ...data };
  await updateContacts(contacts);
  return contacts[index];
};

module.exports = updateById;
