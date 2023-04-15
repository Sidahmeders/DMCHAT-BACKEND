const { Calendar } = require('../models')

// @description     fetch day availability
// @route           GET /api/calendar/:year/:month/:day
// @access          Protected
const fetchDayCalendar = async (req, res) => {
  try {
    const { year, month, day } = req.params
    const dayCalendar = await Calendar.findOne({ date: new Date(`${year}-${month}-${day}`) })
    res.status(200).json(dayCalendar)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     Create A New Working Day
// @route           PUT /api/calendar/:year/:month/:day
// @access          Protected
const createCalendarDay = async (req, res) => {
  try {
    const { year, month, day } = req.params
    const requestedDate = new Date(`${year}-${month}-${day}`)
    const foundCalendar = await Calendar.findOne({ date: requestedDate })

    if (foundCalendar) {
      const updatedCalendarDay = await Calendar.findByIdAndUpdate(foundCalendar._id, req.body, { new: true })
      return res.status(200).json(updatedCalendarDay)
    } else {
      const newCalendarDay = await Calendar.create({ ...req.body, date: requestedDate })
      return res.status(201).json(newCalendarDay)
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

module.exports = {
  fetchDayCalendar,
  createCalendarDay,
}
