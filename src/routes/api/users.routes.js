const { Router } = require('express')
const { users: ctrl } = require('@controllers')
const { jwtValidator } = require('@middlewares')

const router = Router()

router.post('/signup', ctrl.addUser)
router.post('/login', ctrl.loginUser)
router.use(jwtValidator)
router.get('/current', ctrl.getCurrentUser)
router.post('/logout', ctrl.logoutUser)
// router.patch('/:contactId/favorite', ctrl.updateStatusContact)

module.exports = router
