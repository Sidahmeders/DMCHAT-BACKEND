const { User } = require('../../models')
const { verifyToken } = require('../../utils')

const authenticate = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        return res.status(401).json({
          error: { message: 'Not authorized, no token provided' },
        })
      }

      const { id: userId } = verifyToken(token)
      const foundUser = await User.findById(userId).select('-password')

      if (!foundUser) {
        return res.status(401).json({
          error: { message: 'User not found!' },
        })
      }

      req.user = foundUser

      next()
    } catch (error) {
      if (error.name === 'MongooseError') {
        return res.status(503).json({ error: { message: `Mongoose error: ${error.message}` } })
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: { message: 'Token Expired!' } })
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: { message: 'No Token was found or Invalid Signature!' } })
      }
      res.status(500).json({ error: { message: error.message } })
    }
  }
}

module.exports = authenticate
