const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
require("dotenv").config();

const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = process.env;

const sendEmail = async (data) => {
  const mg = mailgun.client({
    username: "tanya.bushmakina@meta.ua",
    key: MAILGUN_API_KEY,
  });

  mg.messages
    .create(MAILGUN_DOMAIN, {
      from: "Mailgun Sandbox <tanya.bushmakina@meta.ua>",
      to: [data.to],
      subject: "Verify your email",
      text: "Verify your email",
      html: data.html,
    })
    .then((msg) => console.log(msg))
    .catch((error) => console.log(error));
};

module.exports = sendEmail;
