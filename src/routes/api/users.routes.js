const { Router } = require('express')
const router = Router()
const { users: ctrl } = require('@controllers')
const { jwtValidator } = require('@middlewares')

// router.get('/', ctrl.listContacts)

// router.get('/:contactId', ctrl.getContactById)

router.post('/signup', ctrl.addUser)

router.post('/login', ctrl.loginUser)

router.post('/logout', jwtValidator, ctrl.logoutUser)

// router.patch('/:contactId/favorite', ctrl.updateStatusContact)

module.exports = router
