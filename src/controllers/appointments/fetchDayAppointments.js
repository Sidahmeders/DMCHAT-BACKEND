module.exports = function makeFetchDayAppointments({ Appointment }) {
  return async function fetchDayAppointments(req, res) {
    try {
      const { year, month, day } = req.params
      const start = new Date(`${year}-${month}-${day}`).setHours(-1)
      const end = new Date(`${year}-${month}-${day}`).setHours(23)
      const dayAppointments = await Appointment.find({ startDate: { $gte: start, $lte: end } }).populate('patient')
      res.status(200).json(dayAppointments)
    } catch (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.message,
      })
    }
  }
}
