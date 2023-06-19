module.exports = function makeFetchPatientAppointments({ Appointment }) {
  return async function fetchPatientAppointments(req, res) {
    try {
      const { patientId } = req.params
      const patientAppointments = await Appointment.find({ patient: patientId })
      res.status(200).json(patientAppointments)
    } catch (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.message,
      })
    }
  }
}
