const { Router } = require('express')
const { users: ctrl } = require('@controllers')
const { jwtValidator } = require('@middlewares')

const router = Router()

router.patch('/', jwtValidator, ctrl.editUserSubscr)
router.post('/signup', ctrl.addUser)
router.post('/login', ctrl.loginUser)
router.use(jwtValidator)
router.get('/current', ctrl.getCurrentUser)
router.post('/logout', ctrl.logoutUser)

module.exports = router
