const { errorHandler } = require('./errorMiddleware')
const protect = require('./authMiddleware')

module.exports = { errorHandler, protect }
