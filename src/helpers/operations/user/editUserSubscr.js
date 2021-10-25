const { User } = require('@models')
const { CustomError } = require('@utils')

const editUserSubscr = async (id, { subscription }) => {
  try {
    console.log(6)
    await User.findByIdAndUpdate(id, { subscription: subscription })
  } catch (error) {
    throw new CustomError(400, error.message)
  }
}

module.exports = editUserSubscr