const { errorHandler } = require('./errorMiddleware')
const protect = require('./authMiddleware')

const { validateAppointment } = require('./validation/appointment.validations')
const { validatePatient } = require('./validation/patient.validation')

module.exports = { errorHandler, protect, validateAppointment, validatePatient }
