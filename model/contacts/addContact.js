const fs = require('fs/promises')
const uniqid = require('uniqid')
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')
const listContacts = require('./listContacts')

const addContact = async (body) => {
  const contacts = await listContacts()
  const newContact = { ...body, id: uniqid() }
  fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]))
  return newContact
}

module.exports = addContact
