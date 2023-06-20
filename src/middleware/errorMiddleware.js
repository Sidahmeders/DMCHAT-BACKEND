const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const errorMessage = err.message || 'Unexpected Internal Error'

  const errorResponse = {
    error: {
      message: errorMessage,
      code: err.code || undefined,
      details: err.details || undefined,
    },
  }

  res.status(statusCode).json(errorResponse)
}

module.exports = { errorHandler }
