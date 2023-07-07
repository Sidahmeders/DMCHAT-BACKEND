const authenticate = require('./auth/authenticate')
const accessControl = require('./auth/accessControl')

const { validateAppointment } = require('./validation/appointment.validations')
const { validatePatient } = require('./validation/patient.validation')

module.exports = { authenticate, accessControl, validateAppointment, validatePatient }
