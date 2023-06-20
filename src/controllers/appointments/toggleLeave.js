module.exports = function makeToggleLeave({ Appointment }) {
  return async function toggleLeave(req, res) {
    try {
      const { id } = req.params
      const { isLeft } = req.body
      const updatedAppointment = await Appointment.findByIdAndUpdate(id, { isLeft: !isLeft }, { new: true })
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
