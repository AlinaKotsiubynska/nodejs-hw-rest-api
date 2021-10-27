const Joi = require('joi')
const { SUBSCR_TYPES } = require('@helpers/constants')

const subscrRegex = new RegExp(Object.values(SUBSCR_TYPES).join('|'))

const editUserSubscrSchema = Joi.object({
  subscription: Joi.string().regex(subscrRegex).required()
})

module.exports = {
  editUserSubscrSchema
}
