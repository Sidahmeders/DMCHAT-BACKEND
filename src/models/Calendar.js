const mongoose = require('mongoose')
const { ENUMs } = require('../config')

const CalendarSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, required: true },
    availability: { type: String, enum: ENUMs.CALENDAR_AVAILABILITIES },
  },
  { timestamps: true },
)

const Calendar = mongoose.model('Calendar', CalendarSchema)
module.exports = Calendar
