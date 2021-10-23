const { Router } = require('express')
const router = Router()
const { users: ctrl } = require('@controllers')

// router.get('/', ctrl.listContacts)

// router.get('/:contactId', ctrl.getContactById)

router.post('/signup', ctrl.addUser)

router.post('/login', ctrl.loginUser)

// router.put('/:contactId', ctrl.updateContact)

// router.patch('/:contactId/favorite', ctrl.updateStatusContact)

module.exports = router
