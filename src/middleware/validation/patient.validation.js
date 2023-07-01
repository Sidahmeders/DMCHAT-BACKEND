const Joi = require('joi')

const validatePatient = (req, res, next) => {
  const patientSchema = Joi.object({
    sender: Joi.string().required(),
    fullName: Joi.string().min(8).max(40).required(),
    age: Joi.number().min(3).max(120).required(),
    phoneNumber: Joi.string().min(8).max(30).required(),
    generalState: Joi.string().empty(''),
  }).unknown()

  const { error } = patientSchema.validate(req.body)

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

module.exports = { validatePatient }
