const fs = require('fs/promises')
const listContacts = require('./listContacts')
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')

const removeContact = async (id) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(contact => contact.id.toString() === id)
  if (index === -1) {
    return null
  }
  const contact = contacts.splice(index, 1)[0]
  fs.writeFile(contactsPath, JSON.stringify(contacts)).catch(err => console.log(err))
  return contact
}

module.exports = removeContact
