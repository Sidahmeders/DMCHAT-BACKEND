const mongoose = require('mongoose')
const { ENUMs } = require('../config')

const AppointmentSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    baseAppointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', default: null },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    title: { type: String, trim: true, required: true },
    isNewTreatment: { type: Boolean, default: false },
    totalPrice: { type: Number, required: true, min: [1000, 'total price is too low'] },
    payment: { type: Number, default: 0 },
    paymentLeft: { type: Number },
    motif: {
      name: { type: String, trim: true, required: true },
      value: {
        type: String,
        enum: ENUMs.APPOINTMENT_MOTIF,
        required: true,
      },
    },
    diagnostic: { type: String, trim: true },
    treatmentPlan: { type: String, trim: true },
    isConfirmed: { type: Boolean, default: false },
    isLeft: { type: Boolean, default: false },
    isWaitingRoom: { type: Boolean, default: false },
    isDone: { type: Boolean, default: false },
    order: { type: Number },
  },
  { timestamps: true },
)

const Appointment = mongoose.model('Appointment', AppointmentSchema)
module.exports = Appointment
