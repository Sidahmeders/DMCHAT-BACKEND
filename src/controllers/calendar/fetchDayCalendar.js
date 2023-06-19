module.exports = function createFetchDayCalendar({ Calendar }) {
  return async function fetchDayCalendar(req, res) {
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
}
