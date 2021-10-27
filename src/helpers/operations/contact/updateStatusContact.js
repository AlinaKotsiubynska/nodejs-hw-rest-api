const { Contact } = require('@models')

const updateStatusContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true })
}

module.exports = updateStatusContact
