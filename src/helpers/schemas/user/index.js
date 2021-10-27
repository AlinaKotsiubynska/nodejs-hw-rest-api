const { newUserSchema } = require('./newUser')
const { editUserSubscrSchema } = require('./editUserSubscr')
const { loginUserSchema } = require('./loginUser')

module.exports = {
  newUserSchema,
  loginUserSchema,
  editUserSubscrSchema
}
