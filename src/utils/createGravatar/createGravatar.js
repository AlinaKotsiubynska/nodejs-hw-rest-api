const gravatar = require('gravatar')

const createGravatar = email => {
  const httpUrl = gravatar.url(email, { protocol: 'http', s: '100' })
  console.log(httpUrl)
  return httpUrl
}

module.exports = {
  createGravatar
}
