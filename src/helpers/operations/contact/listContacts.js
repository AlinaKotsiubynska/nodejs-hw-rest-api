const { Contact } = require('@models')

const listContacts = async (opts, { skip, limit }) => {
  return await Contact.find(opts).skip(skip).limit(limit)
}

module.exports = listContacts
