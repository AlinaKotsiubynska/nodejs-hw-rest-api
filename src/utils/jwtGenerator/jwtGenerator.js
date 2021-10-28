require('dotenv').config()
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env


const jwtGenerator = (payload) => {
  return jwt.sign(payload, SECRET_KEY)
}

module.exports = {
  jwtGenerator
}