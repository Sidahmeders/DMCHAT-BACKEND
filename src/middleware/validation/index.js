const { registerUserSchema, loginUserSchema } = require('./user')
const { patientSchema } = require('./patient')
const { appointmentSchema } = require('./appointment')

const handleSchemaValidation = (req, res, next, schema) => {
  const { error } = schema.validate(req.body)

  if (error) {
    const [firstError] = error.details

    const errorResponse = {
      error: {
        message: firstError.message,
        code: error.code || undefined,
        details: error.details || undefined,
      },
    }

    return res.status(400).json(errorResponse)
  }

  next()
}

module.exports = {
  // User
  validateUserRegistration: (req, res, next) => handleSchemaValidation(req, res, next, registerUserSchema),
  validateUserLogin: (req, res, next) => handleSchemaValidation(req, res, next, loginUserSchema),
  // Patient
  validatePatient: (req, res, next) => handleSchemaValidation(req, res, next, patientSchema),
  // Appointment
  validateAppointment: (req, res, next) => handleSchemaValidation(req, res, next, appointmentSchema),
}
