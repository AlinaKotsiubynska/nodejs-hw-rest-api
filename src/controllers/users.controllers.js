const operation = require('@helpers/operations/user')
const resErrorHandler = require('@utils/resErrorHandler')
const { CustomError } = require('@utils/CustomError')
const {
  newUserSchema,
  loginUserSchema,
  editUserSubscrSchema } = require('@helpers/schemas/user')


const addUser = async (req, res, next) => {
  try {
    const candidate = req.body
    const { error } = newUserSchema.validate(candidate)
    if (error) {
      throw new CustomError(400, error.message)
    }

    const { subscription, email } = await operation.addUser(candidate)

    res.status(201).json({ user: { email, subscription } })
  } catch (error) {
    resErrorHandler(res, error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const candidate = req.body
    const { error } = loginUserSchema.validate(candidate)

    if (error) {
      throw new CustomError(400, error.message)
    }

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
  // try {
  //   const { email } = req.body
  //   const { error } = forgetPasswordSchema.validate({ email })
  //   if (error) {
  //     throw new CustomError(400, error.message)
  //   }
  //   const user = await User.findOne({ email: email })
  //   if (!user) {
  //     throw new CustomError(400, 'Invalid email')
  //   }

  //   const newPass = getRandomPass()
  //   const hashedPass = await hashPassword(newPass)
  //   user.password = hashedPass
  //   await user.save()
  //   const mailOptions = {
  //     from: 'alinakotsiubynska@gmail.com',
  //     to: email,
  //     subject: 'Password reset',
  //     text: `Your new email is ${newPass}. Please, change it after next login`
  //   };
  //   await mailServise.send(mailOptions)

  //   res.status(200).json({ message: 'New password sent to your email address' })
  // } catch (error) {
  //   resErrorHandler(res, error)
  // }
}

module.exports = { addUser, loginUser, logoutUser }