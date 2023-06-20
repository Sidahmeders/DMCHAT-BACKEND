const BaseController = require('./BaseController')

module.exports = class AppointmentController extends BaseController {
  #Appointment

  constructor({ Appointment }) {
    super()
    this.#Appointment = Appointment
  }

  createNewAppointment = async (req, res) => {
    try {
      const appointment = req.body
      if (!appointment.isNewTreatment) {
        return res.status(400).json({ error: 'This endpoint can only handle new appointments!' })
      }

      let newAppointment = await this.#Appointment.create({
        ...appointment,
        paymentLeft: appointment.totalPrice - (appointment.payment || 0),
      })
      newAppointment = await newAppointment.populate('patient')

      res.status(200).json(newAppointment)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  deleteAppointment = async (req, res) => {
    try {
      const { id } = req.params
      const deletedAppointment = await this.#Appointment.findByIdAndDelete(id, { new: true })
      res.status(200).json(deletedAppointment)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  fetchDayAppointments = async (req, res) => {
    try {
      const { year, month, day } = req.params
      const start = new Date(`${year}-${month}-${day}`).setHours(-1)
      const end = new Date(`${year}-${month}-${day}`).setHours(23)
      const dayAppointments = await this.#Appointment
        .find({ startDate: { $gte: start, $lte: end } })
        .populate('patient')
      res.status(200).json(dayAppointments)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  fetchMonthAppointments = async (req, res) => {
    try {
      const { year, month } = req.params
      const allAppointment = await this.#Appointment
        .find({
          startDate: {
            $gte: new Date(`${year}-${month}-1`),
            $lt: new Date(`${year}-${month}-31`),
          },
        })
        .populate('patient')

      res.status(200).json(allAppointment)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  fetchPatientAppointments = async (req, res) => {
    try {
      const { patientId } = req.params
      const patientAppointments = await this.#Appointment.find({ patient: patientId })
      res.status(200).json(patientAppointments)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  relateNewAppointment = async (req, res) => {
    try {
      const appointment = req.body
      if (appointment.isNewTreatment) {
        return res.status(400).json({ error: 'This endpoint can only relate existing appointments!' })
      }

      const baseAppointment = await this.#Appointment.findById(appointment.baseAppointmentId)

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
      const newAppointment = await this.#Appointment.create(doc)

      await this.#Appointment.findByIdAndUpdate(appointment.baseAppointmentId, { paymentLeft: newPaymentLeft })

      res.status(200).json(newAppointment)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  toggleConfirmation = async (req, res) => {
    try {
      const { id } = req.params
      const { isConfirmed } = req.body
      const updatedAppointment = await this.#Appointment.findByIdAndUpdate(
        id,
        { isConfirmed: !isConfirmed },
        { new: true },
      )
      res.status(200).json(updatedAppointment)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  toggleLeave = async (req, res) => {
    try {
      const { id } = req.params
      const { isLeft } = req.body
      const updatedAppointment = await this.#Appointment.findByIdAndUpdate(id, { isLeft: !isLeft }, { new: true })
      res.status(200).json(updatedAppointment)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  updateAppointment = async (req, res) => {
    try {
      const { id } = req.params
      const updatedAppointment = await this.#Appointment
        .findByIdAndUpdate(id, req.body, { new: true })
        .populate('patient')
      res.status(200).json(updatedAppointment)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  updateAppointmentsHistory = async (req, res) => {
    try {
      const appointments = req.body

      await this.#Appointment.bulkWrite(
        appointments.map((appointment) => ({
          updateOne: {
            filter: { _id: appointment._id },
            update: appointment,
          },
        })),
      )

      res.status(200).json(appointments)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
