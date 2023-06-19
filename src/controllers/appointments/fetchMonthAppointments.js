module.exports = function makeFetchMonthAppointments({ Appointment }) {
  return async function fetchMonthAppointments(req, res) {
    try {
      const { year, month } = req.params
      const allAppointment = await Appointment.find({
        startDate: {
          $gte: new Date(`${year}-${month}-1`),
          $lt: new Date(`${year}-${month}-31`),
        },
      }).populate('patient')

      res.status(200).json(allAppointment)
    } catch (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.message,
      })
    }
  }
}
