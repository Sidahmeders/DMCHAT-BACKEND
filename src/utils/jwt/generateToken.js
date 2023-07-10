const { sign: jwtSign } = require('jsonwebtoken')

const generateToken = ({ id, email, expiresIn = process.env.JWT_EXPIRE }) => {
  const token = jwtSign({ id, email }, process.env.JWT_SECRET, { expiresIn })
  return token
}

module.exports = generateToken
