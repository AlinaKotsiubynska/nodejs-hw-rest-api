const { User } = require('@models')
const { CustomError } = require('@utils')

const uploadUserAvatar = async (id, url) => {
  try {
    await User.findByIdAndUpdate(id, { avatarURL: url })
  } catch (error) {
    throw new CustomError(400, error.message)
  }
}

module.exports = uploadUserAvatar