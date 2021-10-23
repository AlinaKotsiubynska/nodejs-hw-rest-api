const { Router } = require('express')
const router = Router()
const { users: ctrl } = require('@controllers')

// router.get('/', ctrl.listContacts)

// router.get('/:contactId', ctrl.getContactById)

router.post('/signup', ctrl.addUser)

// router.delete('/:contactId', ctrl.removeContact)

// router.put('/:contactId', ctrl.updateContact)

// router.patch('/:contactId/favorite', ctrl.updateStatusContact)

module.exports = router
