module.exports = function createUpdateAppointmentsHistory({ Appointment }) {
  return async function updateAppointmentsHistory(req, res) {
    try {
      const appointments = req.body

      await Appointment.bulkWrite(
        appointments.map((appointment) => ({
          updateOne: {
            filter: { _id: appointment._id },
            update: appointment,
          },
        })),
      )

      res.status(200).json(appointments)
    } catch (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.message,
      })
    }
  }
}
