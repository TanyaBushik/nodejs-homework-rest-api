const getList = require("./getList");
const { nanoid } = require("nanoid");
const updateContacts = require("./updateContacts");

const add = async (data) => {
  const contacts = await getList();
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

module.exports = add;
