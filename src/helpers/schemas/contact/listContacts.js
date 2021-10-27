const Joi = require('joi')

const listContacts = Joi.object({
  favorite: Joi.boolean().optional(),
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional()
})

module.exports = listContacts