const { genSalt, hash } = require('bcryptjs')

const generatePasswordHash = async (password) => {
  const salt = await genSalt(10)
  const hashedPassword = await hash(password, salt)
  return hashedPassword
}

module.exports = generatePasswordHash
