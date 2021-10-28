const fs = require('fs/promises')
const path = require('path')
const {
  resErrorHandler,
  joiValidationService,
  createGravatar,
  CustomError,
  emailService,
  jwtGenerator,
  sendEmail } = require('@utils')
const operation = require('@helpers/operations/user')
const {
  newUserSchema,
  loginUserSchema,
  editUserSubscrSchema } = require('@helpers/schemas/user')

const addUser = async (req, res, next) => {
  try {
    const candidate = { ...req.body }

    joiValidationService(newUserSchema, candidate)

    candidate.avatarURL = createGravatar(candidate.email)
    candidate.verifyToken = jwtGenerator({ email: candidate.email })

    const { subscription, email, avatarURL, verifyToken } = await operation.addUser(candidate)
    await sendEmail.onRegistration({ to: email, verifyToken })
    res.status(201).json({ user: { email, subscription, avatarURL } })
  } catch (error) {
    resErrorHandler(res, error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const candidate = req.body
    console.log(candidate)

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

    const { email, subscription, avatarURL } = await operation.getCurrentUser(_id)

    res.status(200).json({ email, subscription, avatarURL })
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

const uploadUserAvatar = async (req, res) => {
  if (!req.file) {
    throw new CustomError(400, 'No file attached')
  }
  const { originalname, path: tempPath } = req.file

  const { email: userEmail } = req.user
  try {
    const ext = path.extname(originalname)
    const newFileName = userEmail + ext
    const filePath = path.join('avatars', newFileName)
    const uploadDir = path.join(__dirname, '../', 'public')
    const publicPath = path.join(uploadDir, 'avatars', newFileName)

    await fs.rename(tempPath, publicPath)

    res.status(200).json({ avatarURL: filePath })
  } catch (error) {
    await fs.unlink(tempPath)
    res.status(500).send()
  }
}

const verifyUser = async (req, res) => {
  try {
    const { verificationToken } = req.params
    await operation.verifyUser(verificationToken)

    res.status(200).json({ message: 'Verification successful' })
  } catch (error) {
    resErrorHandler(res, error)
  }
}

module.exports = {
  addUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  editUserSubscr,
  uploadUserAvatar,
  verifyUser
}