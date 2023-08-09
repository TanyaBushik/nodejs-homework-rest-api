const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = {
  addSchema,
  updateSchema,
};

// const contactsSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().lowercase().required(),
//   phone: Joi.string()
//     .length(14)
//     .pattern(
//       /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
//     )
//     .required(),
// });

// module.exports = contactsSchema;
