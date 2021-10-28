const { resErrorHandler, joiValidationService, createGravatar } = require('@utils')
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

    const { subscription, email, avatarURL } = await operation.addUser(candidate)

    res.status(201).json({ user: { email, subscription, avatarURL } })
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

const uploadUserAvatar = async (req, res) => {
  const uploadDir = path.join(__dirname, '../', 'public')
  const { originalname, path: tempPath } = req.file
  try {
    const publicPath = path.join(uploadDir, 'avatars', originalname)
    const filePath = path.join('public', 'avatars', originalname)
    await fs.rename(tempPath, publicPath).catch(err => console.log('err', err))
    res.status(200).json({ avatarURL: filePath })
  } catch (error) {
    await fs.unlink(tempPath)
    console.log(error)
  }
}

module.exports = {
  addUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  editUserSubscr,
  uploadUserAvatar
}