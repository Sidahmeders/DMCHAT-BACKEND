const mongoose = require('mongoose')

const AppointmentSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    title: { type: String, trim: true, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isConfirmed: { type: Boolean, default: false },
    isLeft: { type: Boolean, default: false },
    isWaitingRoom: { type: Boolean, default: false },
    isInProgress: { type: Boolean, default: false },
    isDone: { type: Boolean, default: false },
    isWaitingList: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const Appointment = mongoose.model('Appointment', AppointmentSchema)
module.exports = Appointment
