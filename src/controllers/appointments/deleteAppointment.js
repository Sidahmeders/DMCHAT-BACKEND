module.exports = function createDeleteAppointment({ Appointment }) {
  return async function deleteAppointment(req, res) {
    try {
      const { id } = req.params
      const deletedAppointment = await Appointment.findByIdAndDelete(id, { new: true })
      res.status(200).json(deletedAppointment)
    } catch (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.message,
      })
    }
  }
}
