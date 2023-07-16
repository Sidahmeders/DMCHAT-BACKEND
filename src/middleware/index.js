const authenticate = require('./auth/authenticate')
const accessControl = require('./auth/accessControl')

const { validateAppointment, validatePatient, validateUserRegistration, validateUserLogin } = require('./validation')

module.exports = {
  authenticate,
  accessControl,
  validateAppointment,
  validatePatient,
  validateUserRegistration,
  validateUserLogin,
}
