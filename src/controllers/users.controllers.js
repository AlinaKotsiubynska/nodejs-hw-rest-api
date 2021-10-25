const { resErrorHandler, joiValidationService } = require('@utils')
const operation = require('@helpers/operations/user')
const {
  newUserSchema,
  loginUserSchema,
  editUserSubscrSchema } = require('@helpers/schemas/user')


const addUser = async (req, res, next) => {
  try {
    const candidate = req.body

    joiValidationService(newUserSchema, candidate)

    const { subscription, email } = await operation.addUser(candidate)

    res.status(201).json({ user: { email, subscription } })
  } catch (error) {
    resErrorHandler(res, error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const candidate = req.body

    joiValidationService(loginUserSchema, candidate)

    const user = await operation.loginUser(candidate)

    res.status(200).json({
      token: user.token,
      user: {
        email: user.email,
        subscription: user.subscription
      }
    })
  } catch (error) {
    resErrorHandler(res, error)
  }
}

const logoutUser = async (req, res, next) => {
  try {
    const { _id } = req.user

    await operation.logoutUser(_id)

    res.status(204).send()
  } catch (error) {
    resErrorHandler(res, error)
  }
}

const getCurrentUser = async (req, res, next) => {
  try {
    const { _id } = req.user

    const { email, subscription } = await operation.getCurrentUser(_id)

    res.status(200).json({ email, subscription })
  } catch (error) {
    resErrorHandler(res, error)
  }
}

const editUserSubscr = async (req, res) => {
  try {
    const { _id } = req.user
    const { subscription } = req.body

    joiValidationService(editUserSubscrSchema, { subscription })

    await operation.editUserSubscr(_id, subscription)
    res.status(204).send()
  } catch (error) {
    resErrorHandler(res, error)
  }
}

module.exports = { addUser, loginUser, logoutUser, getCurrentUser, editUserSubscr }