module.exports = function makeUpdateAppointment({ Appointment }) {
  return async function updateAppointment(req, res) {
    try {
      const { id } = req.params
      const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true }).populate('patient')
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
