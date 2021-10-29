const { Schema, model } = require('mongoose')
const { SUBSCR_TYPES } = require('@helpers/constants')

const user = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: Object.values(SUBSCR_TYPES),
      default: SUBSCR_TYPES.STARTER
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: [true, 'Avatar is required'],
    }

  }
)

const User = model('users', user)

module.exports = User
