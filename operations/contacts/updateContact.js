const { Contact } = require('../../models')

const updateContact = async ({ id, body }) => {
  return await Contact.findByIdAndUpdate(id, body, { new: true })
}

module.exports = updateContact
