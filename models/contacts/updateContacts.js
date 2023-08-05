const { writeFile } = require("fs").promises;
const filePath = require("./filePath");

const updateContacts = async (contacts) =>
  await writeFile(filePath, JSON.stringify(contacts, null, 2));

module.exports = updateContacts;
