const { User } = require('@models')
const { CustomError, validateHashedPassword, jwtGenerator } = require('@utils')

const loginUser = async (candidate) => {
  try {

    const user = await User.findOne({ email: candidate.email })

    if (!user) {
      throw Error('Invalid email')
    }

    if (!user.verify) {
      throw Error('Verify your email')
    }

    await validateHashedPassword(user.password, candidate.password)


    user.token = jwtGenerator({ email: user.email, _id: user._id })
    await user.save()
    return user

  } catch (error) {
    if (error.message.includes('Invalid password') || error.message.includes('Invalid email')) {
      throw new CustomError(401, "Email or password is wrong")
    }
    throw new CustomError(400, error.message)
  }
}

module.exports = loginUser