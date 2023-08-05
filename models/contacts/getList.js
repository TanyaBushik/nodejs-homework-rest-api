const { readFile } = require("fs").promises;
const filePath = require("./filePath");

const getList = async () => {
  const contacts = await readFile(filePath);
  return JSON.parse(contacts);
};

module.exports = getList;
