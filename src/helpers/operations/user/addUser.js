const { User } = require('@models')
const { CustomError, hashPassword } = require('@utils')

const addUser = async (candidate) => {
  console.log(candidate)
  try {
    const hashedPassword = await hashPassword(candidate.password)
    const user = { ...candidate, password: hashedPassword }
    console.log('user', user)
    return await User.create(user)
  } catch (error) {
    if (error.message.includes('E11000')) {
      throw new CustomError(409, "Email in use")
    }
    throw new CustomError(400, error.message)
  }
}

module.exports = addUser