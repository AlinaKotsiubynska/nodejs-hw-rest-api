const Joi = require('joi')

const updateContactStatus = Joi.object({
  favorite: Joi.boolean().required()
})

module.exports = updateContactStatus