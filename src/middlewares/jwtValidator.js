const jwt = require('jsonwebtoken')
const User = require('@models/user.model')
const { CustomError } = require('@utils/CustomError')
const { JWT_TOKEN_REGEX } = require('@helpers/constants')

const { SECRET_KEY } = process.env


const jwtValidator = async (req, res, next) => {
  try {
    const auth = req.headers.authorization
    if (!auth) {
      throw new CustomError(401, "Not authorized")
    }
    const matchTokenRegex = auth.match(JWT_TOKEN_REGEX)
    const token = matchTokenRegex ? matchTokenRegex[0] : ''
    const verified = jwt.verify(token, SECRET_KEY)
    const currentUser = await User.findById(verified['_id'])

    if (!currentUser || currentUser.token !== token) {
      throw new CustomError(401, "Not authorized")
    }

    req.user = verified
    next()
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message })
  }
}

module.exports = jwtValidator