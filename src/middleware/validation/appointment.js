const Joi = require('joi')

const appointmentSchema = Joi.object({
  sender: Joi.string().required(),
  patient: Joi.string().required(),
  baseAppointmentId: Joi.string(),
  title: Joi.string().min(2).max(50).required(),
  motif: Joi.object({
    name: Joi.string().min(5).max(30).required(),
    value: Joi.string().valid('pain', 'functional', 'aesthetic', 'others').required(),
  }),
  diagnostic: Joi.string().min(3).max(500).empty(''),
  treatmentPlan: Joi.string().min(3).max(500).empty(''),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
  totalPrice: Joi.number().min(1000),
  payment: Joi.number(),
  paymentLeft: Joi.number(),
  isNewTreatment: Joi.boolean(),
  isConfirmed: Joi.boolean(),
  isLeft: Joi.boolean(),
  isWaitingRoom: Joi.boolean(),
  isDone: Joi.boolean(),
  order: Joi.number(),
}).unknown()

module.exports = {
  appointmentSchema,
}
