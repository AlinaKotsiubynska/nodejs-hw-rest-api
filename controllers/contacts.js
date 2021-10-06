const operation = require('../operations/contacts')
const resErrorHandler = require('../utils/resErrorHandler')
const DbError = require('../utils/DbError')
const { newContactSchema, edeitContactSchema } = require('../schemas')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await operation.listContacts()
    res.json(contacts)
  } catch (error) {
    res.json({ message: error.message })
  }
}

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await operation.getContactById(contactId)
    if (!contact) {
      throw new DbError(404, 'Not found')
    }
    res.json(contact)
  } catch (error) {
    // res.status(error.status).json({ status: 'error', code: error.status, message: error.message })
    resErrorHandler(res, error)
  }
}

const addContact = async (req, res, next) => {
  try {
    const candidate = req.body
    const { error } = newContactSchema.validate(candidate)
    if (error) {
      throw new DbError(400, error.message)
    }
    const newContact = await operation.addContact(candidate)
    res.status(201).json(newContact)
  } catch (error) {
    // res.status(error.status).json({ status: 'error', code: error.status, message: error.message })
    resErrorHandler(res, error)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await operation.removeContact(contactId)
    if (!contact) {
      throw new DbError(404, 'Not found')
    }
    res.json({ message: 'contact deleted' })
  } catch (error) {
    // res.status(error.status).json({ status: 'error', code: error.status, message: error.message })
    resErrorHandler(res, error)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const updatetContact = await operation.updateContact({ id: contactId, body: req.body })
    if (!updatetContact) {
      throw new DbError(404, 'Not found')
    }
    const { error } = edeitContactSchema.validate(req.body)
    if (error) {
      throw new DbError(400, error.message)
    }
    res.json(updatetContact)
  } catch (error) {
    // res.status(error.status || 404).json({ status: 'error', code: error?.status, message: error?.message })
    resErrorHandler(res, error)
  }
}

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body
    const isContactExists = await operation.checkContact(contactId)
    if (!isContactExists) {
      throw new DbError(404, 'Not found')
    }

    if (favorite === undefined) {
      throw new DbError(400, 'missing field favorite')
    }
    const updatetContact = await operation.updateStatusContact(contactId, {favorite})
    res.json(updatetContact)
  } catch (error) {
    // res.status(error.status).json({ status: 'error', code: error.status, message: error.message })
    resErrorHandler(res, error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact
}
