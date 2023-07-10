const { parse: parseURL } = require('url')
const { pathToRegexp } = require('path-to-regexp')
const { merge, omit } = require('lodash')

const { Endpoints } = require('../../config')

const doctorScope = merge(
  {},
  Endpoints.APPOINTMENT,
  Endpoints.CALENDAR,
  Endpoints.CHAT,
  omit(Endpoints.MESSAGE, 'DELETE'),
  Endpoints.PATIENT,
  Endpoints.PAYMENT,
  omit(Endpoints.USER, 'PUT'),
)

const assistantScope = merge(
  {},
  Endpoints.APPOINTMENT,
  Endpoints.CALENDAR,
  Endpoints.CHAT,
  omit(Endpoints.MESSAGE, 'DELETE'),
  Endpoints.PATIENT,
  Endpoints.PAYMENT,
  omit(Endpoints.USER, 'PUT'),
)

const findRouteMatch = (originalUrl, scopes = {}) => {
  const parsedURL = parseURL(originalUrl)
  const matchedRoute = Object.values(scopes).find((route) => {
    return pathToRegexp('/api' + route).test(parsedURL.pathname)
  })
  return Boolean(matchedRoute)
}

const accessControl = async (req, res, next) => {
  try {
    const { role } = req.user

    if (role === 'admin') {
      return next()
    }

    if (role === 'doctor') {
      const isRouteMatch = findRouteMatch(req.originalUrl, doctorScope[req.method])
      if (!isRouteMatch) {
        return res.status(401).json({
          error: { message: 'Not authorized to access this resource!' },
        })
      }
      return next()
    }

    if (role === 'assistant') {
      const isRouteMatch = findRouteMatch(req.originalUrl, assistantScope[req.method])
      if (!isRouteMatch) {
        return res.status(401).json({
          error: { message: 'Not authorized to access this resource!' },
        })
      }
      return next()
    }

    res.status(401).json({
      error: { message: 'Not authorized to access this resource!' },
    })
  } catch (error) {
    res.status(500).json({
      error: { message: error.message },
    })
  }
}

module.exports = accessControl
