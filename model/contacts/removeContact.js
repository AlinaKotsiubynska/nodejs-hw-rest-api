const fs = require('fs/promises')
const listContacts = require('./listContacts')

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const newList = contacts.filter(el => el.id.toString() !== contactId.toString())
  fs.writeFile('./contacts.json', JSON.stringify(newList))
  return newList
}

module.exports = removeContact
