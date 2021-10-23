const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().min(1),
  email: Joi.string().pattern(/^[a-zA-Z0-9.]{3,}@[a-zA-Z0-9]+[.]+[a-zA-Z0-9]+$/),
  phone: Joi.string().min(5),
  favorite: Joi.forbidden()
}).min(1).max(3).required()

module.exports = contactSchema
