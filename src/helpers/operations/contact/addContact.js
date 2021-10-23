const { Contact } = require('@models')

const addContact = async (candidate) => {
  return await Contact.create(candidate)
}

module.exports = addContact
