const getCurrentUser = require('./getCurrentUser')
const addUser = require('./addUser')
const loginUser = require('./loginUser')
const logoutUser = require('./logoutUser')
const editUserSubscr = require('./editUserSubscr')

module.exports = {
  addUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  editUserSubscr
}
