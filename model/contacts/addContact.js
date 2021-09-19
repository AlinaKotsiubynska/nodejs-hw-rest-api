const fs = require('fs/promises')
const uniqid = require('uniqid')

const addContact = async (body) => {
  const newContact = { ...body, id: uniqid() }
  fs.appendFile('./contacts.json', JSON.stringify(newContact))
  console.log(newContact)
  return newContact.id
}

module.exports = addContact
