const Joi = require('joi')

const patientSchema = Joi.object({
  sender: Joi.string().required(),
  fullName: Joi.string().min(8).max(40).required(),
  birthDate: Joi.date().iso().required(),
  phoneNumber: Joi.string().min(8).max(30).required(),
  generalState: Joi.string().empty(''),
}).unknown()

module.exports = {
  patientSchema,
}
