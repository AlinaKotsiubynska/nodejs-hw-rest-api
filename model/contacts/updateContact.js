const fs = require('fs/promises')
const listContacts = require('./listContacts')
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts/contacts.json')

const updateContact = async ({ id, body }) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(contact => contact.id === id)
  if (index === -1) {
    return null
  }
  const contact = { ...contacts[index], ...body }
  contacts[index] = contact
  fs.writeFile(contactsPath, contacts)
  return contact
}

module.exports = updateContact
