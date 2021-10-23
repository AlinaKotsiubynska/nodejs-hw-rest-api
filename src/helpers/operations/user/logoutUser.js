const { User } = require('@models')
const { CustomError } = require('@utils/CustomError')

const logoutUser = async (id) => {
  try {
    await User.findByIdAndUpdate(id, { token: null })
  } catch (error) {
    if (!error.status) {
      throw new CustomError(400, error.message)
    }
    throw error
  }
}

module.exports = logoutUser