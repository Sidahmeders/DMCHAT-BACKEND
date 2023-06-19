module.exports = function createNewAppointment({ Appointment }) {
  return async function createNewAppointment(req, res) {
    try {
      const appointment = req.body
      if (!appointment.isNewTreatment) {
        return res.status(400).json({ error: 'This endpoint can only handle new appointments!' })
      }

      let newAppointment = await Appointment.create({
        ...appointment,
        paymentLeft: appointment.totalPrice - (appointment.payment || 0),
      })
      newAppointment = await newAppointment.populate('patient')

      res.status(200).json(newAppointment)
    } catch (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.message,
      })
    }
  }
}
