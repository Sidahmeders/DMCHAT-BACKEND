const authenticate = require('./authenticate')

const { validateAppointment } = require('./validation/appointment.validations')
const { validatePatient } = require('./validation/patient.validation')

module.exports = { authenticate, validateAppointment, validatePatient }
