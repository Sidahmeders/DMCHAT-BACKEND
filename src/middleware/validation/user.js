const Joi = require('joi')

const registerUserSchema = Joi.object({
  name: Joi.string().min(10).max(40).required(),
  email: Joi.string().email().max(60).required(),
  password: Joi.string().min(8).max(60).required(),
  pic: Joi.string().empty(''),
})

const loginUserSchema = Joi.object({
  email: Joi.string().email().max(60).required(),
  password: Joi.string().min(8).max(60).required(),
})

module.exports = {
  registerUserSchema,
  loginUserSchema,
}
