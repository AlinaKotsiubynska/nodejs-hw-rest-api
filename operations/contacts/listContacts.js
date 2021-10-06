const { Contact } = require('../../models')

const listContacts = async () => {
  return await Contact.find()
}

module.exports = listContacts
