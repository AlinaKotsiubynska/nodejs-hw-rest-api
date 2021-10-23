const Joi = require('joi')
const { EMAIL_REGEX } = require('@helpers/constants')

const newUserSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEX).required(),
  password: Joi.string().min(1).required()
})

module.exports = {
  newUserSchema
}