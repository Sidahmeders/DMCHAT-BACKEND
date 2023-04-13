const mongoose = require('mongoose')

const PatientSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fullName: { type: String, trim: true, required: true },
    age: { type: Number, trim: true, required: true },
    motif: { type: String, trim: true, required: true },
    generalState: { type: String, trim: true, required: true },
    diagnostic: { type: String, trim: true },
    treatmentPlan: { type: String, trim: true },
    history: { type: String, trim: true },
    appointment: { type: Date, required: true },
  },
  { timestamps: true },
)

const Patient = mongoose.model('Patient', PatientSchema)
module.exports = Patient
