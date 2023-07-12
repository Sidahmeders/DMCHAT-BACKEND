module.exports = class BaseController {
  handleSuccess(res, data, status) {
    const statusCode = status || 200

    const successResponse = {
      status: 'success',
      data: data,
    }

    if (data) {
      res.status(statusCode).json(successResponse)
    } else {
      res.status(statusCode).end()
    }
  }

  handleError(res, error) {
    const statusCode = error.statusCode || 500
    const errorMessage = error.message || 'Erreur de serveur interne inattendue'

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
