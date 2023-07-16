const Joi = require('joi')

const patientSchema = Joi.object({
  sender: Joi.string().required(),
  fullName: Joi.string().min(8).max(40).required(),
  age: Joi.number().min(3).max(120).required(),
  phoneNumber: Joi.string().min(8).max(30).required(),
  generalState: Joi.string().empty(''),
}).unknown()

module.exports = {
  patientSchema,
}
