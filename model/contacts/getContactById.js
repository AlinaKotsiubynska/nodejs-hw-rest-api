const listContacts = require('./listContacts')

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  return contacts.find(el => el.id.toString() === contactId.toString())
}

module.exports = getContactById
