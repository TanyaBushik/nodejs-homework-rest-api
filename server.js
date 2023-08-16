const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT, () => console.log("DB Connected")))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
