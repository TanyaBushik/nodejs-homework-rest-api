const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const filePath = path.join(__dirname, "contacts.json");

const getContactsList = async () => {
  try {
    const data = await fs.readFile(filePath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const updateContacts = async (contacts) =>
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));

const addContact = async (body) => {
  try {
    const contacts = await getContactsList();
    const newContact = { id: nanoid(), ...body };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await getContactsList();
    const result = contacts.find((contact) => contact.id === contactId);
    return result || null;
  } catch (error) {
    console.log(error);
  }
};

const removeContactById = async (contactId) => {
  try {
    const contacts = await getContactsList();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) return null;
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result || null;
  } catch (error) {
    console.log(error);
  }
};

const updateContactById = async (id, data) => {
  try {
    const contacts = await getContactsList();
    const index = contacts.findIndex((contact) => contact.id === id);

    if (index === -1) return null;

    contacts[index] = { ...contacts[index], ...data };
    await updateContacts(contacts);
    return contacts[index];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addContact,
  getContactById,
  getContactsList,
  updateContacts,
  removeContactById,
  updateContactById,
};
