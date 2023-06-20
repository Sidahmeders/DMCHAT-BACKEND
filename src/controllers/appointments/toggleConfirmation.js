module.exports = function makeToggleConfirmation({ Appointment }) {
  return async function toggleConfirmation(req, res) {
    try {
      const { id } = req.params
      const { isConfirmed } = req.body
      const updatedAppointment = await Appointment.findByIdAndUpdate(id, { isConfirmed: !isConfirmed }, { new: true })
      res.status(200).json(updatedAppointment)
    } catch (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.message,
      })
    }
  }
}
