const { verify: jwtVerify } = require('jsonwebtoken')

const verifyToken = (token) => {
  const decoded = jwtVerify(token, process.env.JWT_SECRET)
  return decoded
}

module.exports = verifyToken
