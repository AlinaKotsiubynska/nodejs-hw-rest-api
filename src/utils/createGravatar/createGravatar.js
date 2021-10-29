const gravatar = require('gravatar')

const createGravatar = email => {
  return gravatar.url(email, { protocol: 'http', s: '100' })
}

module.exports = {
  createGravatar
}
