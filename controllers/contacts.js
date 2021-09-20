const contactsOperations = require('../model/contacts')
const { newContactSchema, edeitContactSchema } = require('../schemas')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json(contacts)
  } catch (error) {
    res.json({ message: error.message })
  }
}

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contactsOperations.getContactById(contactId)
    if (!contact) {
      const customError = new Error('Not found')
      customError.status = 404
      throw customError
    }
    res.json(contact)
  } catch (error) {
    res.status(error.status).json({ status: 'error', code: error.status, message: error.message })
  }
}

const addContact = async (req, res, next) => {
  try {
    const { error } = newContactSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const newContact = await contactsOperations.addContact(req.body)
    res.status(201).json(newContact)
  } catch (error) {
    res.status(error.status).json({ status: 'error', code: error.status, message: error.message })
  }
}

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contactsOperations.removeContact(contactId)
    if (!contact) {
      const customError = new Error('Not found')
      customError.status = 404
      throw customError
    }
    res.json({ message: 'contact deleted' })
  } catch (error) {
    res.status(error.status).json({ status: 'error', code: error.status, message: error.message })
  }
}

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const updatetContact = await contactsOperations.updateContact({ id: contactId, body: req.body })
    if (!updatetContact) {
      const customError = new Error('Not found')
      customError.status = 404
      throw customError
    }
    const { error } = edeitContactSchema.validate(req.body)
    if (error) {
      const customError = new Error(error.message)
      customError.status = 400
      throw customError
    }
    res.json(updatetContact)
  } catch (error) {
    res.status(error.status).json({ status: 'error', code: error.status, message: error.message })
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
}
