const { createGravatar } = require('./createGravatar')
const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\/.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/

describe('Creates gravatar', () => {
  test('should return gravatarUrlString', () => {
    expect(createGravatar('mila@mail.com')).toMatch(regex)
  })
})