const { Contact } = require('../../models')

const getContactById = async (contactId) => {
  return await Contact.findById(contactId)
}

module.exports = getContactById
