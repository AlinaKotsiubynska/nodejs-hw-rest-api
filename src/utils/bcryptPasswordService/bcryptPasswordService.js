const bcrypt = require('bcrypt');
const { CustomError } = require('@utils/CustomError')
const { BCRYPT_ROUNDS } = require('@helpers/constants')

const hashPassword = async (password) => await bcrypt.hash(password, BCRYPT_ROUNDS)

const validateHashedPassword = async (hashedPassword, password) => {
  try {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword)
    if (!isPasswordValid) {
      throw new CustomError(400, 'Invalid password')
    }
  } catch (error) {
    throw new CustomError(502, error.message)
  }
}

module.exports = {
  hashPassword,
  validateHashedPassword
}
