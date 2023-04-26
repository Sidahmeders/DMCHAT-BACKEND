const mongoose = require('mongoose')

const AppointmentMessageSchema = mongoose.Schema(
  {
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    content: { type: String, trim: true },
  },
  { timestamps: true },
)

const AppointmentMessage = mongoose.model('AppointmentMessage', AppointmentMessageSchema)
module.exports = AppointmentMessage
