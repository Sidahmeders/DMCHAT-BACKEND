const bcrypt = require('bcryptjs')

const generatePasswordHash = async (password) => {
  const salt = await bcrypt.genSaltSync(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

module.exports = generatePasswordHash
