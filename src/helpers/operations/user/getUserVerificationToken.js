const { User } = require('@models')
const { CustomError } = require('@utils')

const getUserVerificationToken = async (email) => {
  try {
    const user = await User.findOne({ email: email })
    if (!user) {
      throw new CustomError(404, 'User not found')
    }
    if (!!user.verify) {
      throw new CustomError(400, 'Verification has already been passed')
    }
    return user.verifyToken

  } catch (error) {
    throw new CustomError(400, error.message)
  }
}

module.exports = getUserVerificationToken