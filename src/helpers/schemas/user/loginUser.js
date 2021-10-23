const Joi = require('joi')

const loginUserSchema = Joi.object({
  email: Joi.string().min(1).required(),
  password: Joi.string().min(1).required()
})

module.exports = {
  loginUserSchema
}