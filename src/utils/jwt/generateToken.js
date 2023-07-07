const jwt = require('jsonwebtoken')

const generateToken = ({ id, email, expiresIn = process.env.JWT_EXPIRE }) => {
  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn })
  return token
}

module.exports = generateToken
