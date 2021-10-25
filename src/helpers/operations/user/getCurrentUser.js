const { User } = require('@models')
const { CustomError } = require('@utils')

const getCurrentUser = async (id) => {
  try {

    return await User.findById(id)

  } catch (error) {
    throw new CustomError(400, error.message)
  }
}

module.exports = getCurrentUser