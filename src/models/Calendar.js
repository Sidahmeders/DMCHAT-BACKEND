const mongoose = require('mongoose')

const CalendarSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, required: true },
    availability: { type: String, enum: ['EMPTY', 'REST', 'BUSY', 'LOADED'] },
  },
  { timestamps: true },
)

const Calendar = mongoose.model('Calendar', CalendarSchema)
module.exports = Calendar
