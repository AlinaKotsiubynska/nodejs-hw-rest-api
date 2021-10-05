const { Contact } = require('../../models')

const checkContact = async (contactId) => {
  return await Contact.exists({ _id: contactId })
}

module.exports = checkContact
