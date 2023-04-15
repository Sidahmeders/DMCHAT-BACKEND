const mongoose = require('mongoose')

const AppointmentSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    title: { type: String, trim: true },
    date: { type: Date, required: true },
    isConfirmed: { type: Boolean, default: false },
    isLeft: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const Appointment = mongoose.model('Appointment', AppointmentSchema)
module.exports = Appointment
