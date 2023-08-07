const getList = require("./getList");
const updateContacts = require("./updateContacts");

const updateById = async (id, { name, email, phone }) => {
  const contacts = await getList();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) return null;

  contacts[index] = { ...contacts[index], name, email, phone };
  await updateContacts(contacts);
  return contacts[index];
};

module.exports = updateById;
