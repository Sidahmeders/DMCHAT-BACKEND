module.exports = function relateNewAppointment({ Appointment }) {
  return async function relateNewAppointment(req, res) {
    try {
      const appointment = req.body
      if (appointment.isNewTreatment) {
        return res.status(400).json({ error: 'This endpoint can only relate existing appointments!' })
      }

      const baseAppointment = await Appointment.findById(appointment.baseAppointmentId)

      if (!baseAppointment) {
        return res.status(400).json({ error: 'baseAppointment not found!' })
      }

      const { motif, generalState, diagnostic, treatmentPlan, totalPrice } = baseAppointment
      const newPaymentLeft = baseAppointment.paymentLeft - appointment.payment

      const doc = {
        ...req.body,
        motif,
        generalState,
        diagnostic,
        treatmentPlan,
        totalPrice,
        paymentLeft: newPaymentLeft,
      }
      const newAppointment = await Appointment.create(doc)

      await Appointment.findByIdAndUpdate(appointment.baseAppointmentId, { paymentLeft: newPaymentLeft })

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
