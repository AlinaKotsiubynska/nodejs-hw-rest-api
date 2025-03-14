const JWT_TOKEN_REGEX = /[\w\d\-_]+\.[\w\d\-_]+\.[\w\d\-_]+/m
const EMAIL_REGEX = /^[\w\d!#$%&'*+-/=?^`{|.]{3,}@[\w\d!#$%&'*+-/=?^`{|.]+[.]+[\w\d!#$%&'*+-/=?^`{|.]+$/
const BCRYPT_ROUNDS = 8;
const SUBSCR_TYPES = {
  STARTER: 'starter',
  PRO: 'pro',
  BUSINESS: 'business'
}

module.exports = {
  JWT_TOKEN_REGEX,
  EMAIL_REGEX,
  BCRYPT_ROUNDS,
  SUBSCR_TYPES,
}