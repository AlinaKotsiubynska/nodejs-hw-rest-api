const operation = require('@helpers/operations/contact')
const { resErrorHandler, CustomError, joiValidationService } = require('@utils')
const { newContactSchema, editContactSchema, listContactsSchema } = require('@helpers/schemas/contact')

const listContacts = async (req, res, next) => {
  try {
    const { favorite, page, limit } = req.query
    joiValidationService(listContactsSchema, { favorite, page, limit })

    const paginationOps = {
      skip: page ? parseInt(page) * limit : 0,
      limit: limit ? parseInt(limit) : 0
    }
    const searchOpts = favorite === undefined ? {} : { favorite }

    const contacts = await operation.listContacts(searchOpts, paginationOps)
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
      throw new CustomError(404, 'Not found')
    }
    res.json(contact)
  } catch (error) {
    resErrorHandler(res, error)
  }
}

const addContact = async (req, res, next) => {
  try {
    const candidate = req.body

    joiValidationService(newContactSchema, candidate)

    const newContact = await operation.addContact(candidate)
    res.status(201).json(newContact)
  } catch (error) {
    resErrorHandler(res, error)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await operation.removeContact(contactId)
    if (!contact) {
      throw new CustomError(404, 'Not found')
    }
    res.json({ message: 'contact deleted' })
  } catch (error) {
    resErrorHandler(res, error)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const updatedContact = await operation.updateContact({ id: contactId, body: req.body })
    if (!updatedContact) {
      throw new CustomError(404, 'Not found')
    }

    joiValidationService(editContactSchema, req.body)

    res.json(updatedContact)
  } catch (error) {
    resErrorHandler(res, error)
  }
}

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body
    const isContactExists = await operation.checkContact(contactId)
    if (!isContactExists) {
      throw new CustomError(404, 'Not found')
    }
    joiValidationService(updateContactStatusSchema, { favorite })

    const updatetContact = await operation.updateStatusContact(contactId, { favorite })
    res.json(updatetContact)
  } catch (error) {
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
