const { baseURLs } = require('../../config')

const accessControl = async (req, res, next) => {
  try {
    const { role } = req.user

    if (role === 'admin') next()
    if (role === 'doctor' || role === 'assistant') {
      const baseUrl = req.baseUrl
      if (baseUrl === baseURLs.STATISTICS) {
        return res.status(401).json({
          error: { message: 'Not authorized to access this resource!' },
        })
      }
      next()
    }

    // res.status(401).json({
    //   error: { message: 'Not authorized to access this resource!' },
    // })
    next()
  } catch (error) {
    res.status(500).json({
      error: { message: error.message },
    })
  }
}

module.exports = accessControl
