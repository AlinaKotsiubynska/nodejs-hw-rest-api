// const contactsOperations = require('../model/contacts')
const { Contact } = require('../models')
const { newContactSchema, edeitContactSchema } = require('../schemas')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find()
    res.json(contacts)
  } catch (error) {
    res.json({ message: error.message })
  }
}

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await Contact.findById(contactId)
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
    const candidate = req.body
    const { error } = newContactSchema.validate(candidate)
    if (error) {
      error.status = 400
      throw error
    }
    const newContact = await Contact.create(candidate)
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
