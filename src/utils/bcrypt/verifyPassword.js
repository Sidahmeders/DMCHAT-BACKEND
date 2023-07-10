const { compare } = require('bcryptjs')

const verifyPassword = async (enteredPassword, existingPassword) => {
  const isMatch = await compare(enteredPassword, existingPassword)
  return Boolean(isMatch)
}

module.exports = verifyPassword
