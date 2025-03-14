const { User } = require('@models')
const { CustomError } = require('@utils')

const editUserSubscr = async (id, { subscription }) => {
  try {
    await User.findByIdAndUpdate(id, { subscription: subscription })
  } catch (error) {
    throw new CustomError(400, error.message)
  }
}

module.exports = editUserSubscr