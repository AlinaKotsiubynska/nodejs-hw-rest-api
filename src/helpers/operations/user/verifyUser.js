const { User } = require('@models')
const { CustomError } = require('@utils')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const resendValidatonEmail = async (token) => {
  try {
    const { email } = jwt.verify(token, SECRET_KEY)
    const user = await User.findOne({ email: email })
    if (user.verifyToken !== token) {
      throw new CustomError(404, 'User not found')
    }
    user.verifyToken = 'null'
    user.verify = true

    await user.save()
  } catch (error) {
    throw new CustomError(400, error.message)
  }
}

module.exports = resendValidatonEmail