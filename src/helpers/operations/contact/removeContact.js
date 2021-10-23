const { Contact } = require('@models')

const removeContact = async (id) => {
  return await Contact.findByIdAndDelete(id)
}

module.exports = removeContact
