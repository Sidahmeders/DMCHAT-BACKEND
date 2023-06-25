const jwt = require('jsonwebtoken')

const generateToken = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
  return token
}

module.exports = generateToken
