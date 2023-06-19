module.exports = function makeSetCalendarDayAvailability({ Calendar }) {
  return async function setCalendarDayAvailability(req, res) {
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
}
