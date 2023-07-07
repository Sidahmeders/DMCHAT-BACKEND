const { User } = require('../models')
const { verifyToken } = require('../utils')

const protect = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Splits "Bearer <TOKEN>"
      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        return res.status(401).json({
          error: {
            message: 'Not authorized, no token provided',
          },
        })
      }

      const decoded = verifyToken(token)

      // Find user with the id and return it without the password
      req.user = await User.findById(decoded.id).select('-password')

      next() // Move on to next operation
    } catch (error) {
      if (error.name === 'MongooseError') {
        return res.status(503).json({
          error: {
            message: `Mongoose error: ${error.message}`,
          },
        })
      } else {
        return res.status(401).json({
          error: {
            message: 'Not authorized, token failed',
          },
        })
      }
    }
  }
}

module.exports = protect
