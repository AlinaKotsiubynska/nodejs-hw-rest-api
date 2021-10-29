const { Router } = require('express')
const { users: ctrl } = require('@controllers')
const { jwtValidator, multerUpload, jimpImgConvertor } = require('@middlewares')

const router = Router()

router.patch('/', jwtValidator, ctrl.editUserSubscr)
router.post('/signup', ctrl.addUser)
router.post('/login', ctrl.loginUser)
router.get('/verify/:verificationToken', ctrl.verifyUser)
router.post('/verify', ctrl.resendVerificationEmail)
router.use(jwtValidator)
router.get('/current', ctrl.getCurrentUser)
router.post('/logout', ctrl.logoutUser)
router.patch('/avatars', multerUpload.single('avatar'), jimpImgConvertor, ctrl.uploadUserAvatar)

module.exports = router
