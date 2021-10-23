const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env


const jwtGenerator = ({ email, _id }) => {
  const payload = {
    email,
    _id
  }
  if (!_id) {
    throw new Error('_id is required')
  }
  return jwt.sign(payload, SECRET_KEY)
}

module.exports = {
  jwtGenerator
}