const bcrypt = require('bcryptjs')

const verifyPassword = async (enteredPassword, existingPassword) => {
  const isMatch = await bcrypt.compare(enteredPassword, existingPassword)
  return Boolean(isMatch)
}

module.exports = verifyPassword
