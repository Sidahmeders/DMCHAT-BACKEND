const mongoose = require('mongoose')

const PatientSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fullName: { type: String, trim: true, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    generalState: { type: String, trim: true },
  },
  { timestamps: true },
)

const Patient = mongoose.model('Patient', PatientSchema)
module.exports = Patient
