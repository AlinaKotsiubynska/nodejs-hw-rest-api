const { User } = require('@models')
const { CustomError } = require('@utils/CustomError')

const addUser = async (candidate) => {
  try {
    return await User.create(candidate)
  } catch (error) {
    if (error.message.includes('E11000')) {
      throw new CustomError(409, "Email in use")
    }
    throw new CustomError(400, error.message)
  }
}

module.exports = addUser