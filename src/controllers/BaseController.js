module.exports = class BaseController {
  handleError(res, error) {
    const statusCode = error.statusCode || 500
    const errorMessage = error.message || 'Unexpected Internal Error'

    const errorResponse = {
      error: {
        message: errorMessage,
        code: error.code || undefined,
        details: error.details || undefined,
      },
    }

    res.status(statusCode).json(errorResponse)
  }
}
