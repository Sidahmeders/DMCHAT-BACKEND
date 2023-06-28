const mongoose = require('mongoose')

const PaymentSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    amount: { type: Number, required: true },
    payerName: { type: String, trim: true, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true },
)

const Payment = mongoose.model('Payment', PaymentSchema)
module.exports = Payment
