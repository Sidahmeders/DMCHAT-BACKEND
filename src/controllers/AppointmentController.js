const { Types } = require('mongoose')
const BaseController = require('./BaseController')

module.exports = class AppointmentController extends BaseController {
  #Appointment

  constructor({ Appointment }) {
    super()
    this.#Appointment = Appointment
  }

  #aggregateTotalPaymentById = async (id) => {
    try {
      const result = await this.#Appointment.aggregate([
        { $match: { $or: [{ _id: Types.ObjectId(id) }, { baseAppointmentId: Types.ObjectId(id) }] } },
        { $group: { _id: null, totalPayments: { $sum: '$payment' } } },
      ])

      const [firstMatch] = result
      return firstMatch?.totalPayments || null
    } catch (error) {
      throw new Error(error)
    }
  }

  createNewAppointment = async (req, res) => {
    try {
      const appointment = req.body

      let newAppointment = await this.#Appointment.create({
        ...appointment,
        isNewTreatment: true,
        paymentLeft: appointment.totalPrice - (appointment.payment || 0),
      })
      newAppointment = await newAppointment.populate('patient')

      this.handleSuccess(res, newAppointment)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  relateNewAppointment = async (req, res) => {
    try {
      const appointment = req.body

      const baseAppointment = await this.#Appointment.findById(appointment.baseAppointmentId)
      if (!baseAppointment) {
        return this.handleError(res, { message: 'baseAppointment not found!' })
      }

      const { diagnostic, treatmentPlan, totalPrice } = baseAppointment
      const newPaymentLeft = baseAppointment.paymentLeft - appointment.payment

      let newAppointment = await this.#Appointment.create({
        ...req.body,
        diagnostic,
        treatmentPlan,
        totalPrice,
        paymentLeft: newPaymentLeft,
      })
      newAppointment = await newAppointment.populate('patient')

      await this.#Appointment.findByIdAndUpdate(appointment.baseAppointmentId, { paymentLeft: newPaymentLeft })

      this.handleSuccess(res, newAppointment)
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

      this.handleSuccess(res, updatedAppointment)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  updateAppointmentSync = async (req, res) => {
    try {
      const { body, params } = req
      const targetAppointment = await this.#Appointment.findById(params.id)

      if (!targetAppointment) {
        return this.handleError(res, { statusCode: 404, message: 'Appointment not Found!' })
      }

      const { payment: targetPreviousPayment } = targetAppointment

      const updatedAppointment = await this.#Appointment
        .findByIdAndUpdate(params.id, { ...body, payment: body.payment + targetPreviousPayment }, { new: true })
        .populate('patient')

      const { baseAppointmentId, totalPrice } = updatedAppointment
      const appointmentId = baseAppointmentId || params.id
      const previousPayments = await this.#aggregateTotalPaymentById(appointmentId)
      const paymentLeft = totalPrice - previousPayments

      await this.#Appointment.updateMany(
        { $or: [{ _id: appointmentId }, { baseAppointmentId: appointmentId }] },
        { $set: { totalPrice, paymentLeft } },
      )

      this.handleSuccess(res, { ...updatedAppointment._doc, paymentLeft })
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

      this.handleSuccess(res, appointments)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  deleteAppointment = async (req, res) => {
    try {
      const { id } = req.params
      const { baseAppointmentId, payment, paymentLeft } = await this.#Appointment.findByIdAndDelete(id, { new: true })
      await this.#Appointment.findByIdAndUpdate(baseAppointmentId, { paymentLeft: payment + paymentLeft })

      this.handleSuccess(res)
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

      this.handleSuccess(res, dayAppointments)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  fetchMonthAppointments = async (req, res) => {
    try {
      const { year, month } = req.params
      const monthAppointments = await this.#Appointment
        .find({
          startDate: {
            $gte: new Date(`${year}-${month}-1`),
            $lt: new Date(`${year}-${month}-31`),
          },
        })
        .populate('patient')

      this.handleSuccess(res, monthAppointments)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  fetchPatientAppointments = async (req, res) => {
    try {
      const { patientId } = req.params
      const patientAppointments = await this.#Appointment.find({ patient: patientId })

      this.handleSuccess(res, patientAppointments)
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

      this.handleSuccess(res, updatedAppointment)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  toggleLeave = async (req, res) => {
    try {
      const { id } = req.params
      const { isLeft } = req.body
      const updatedAppointment = await this.#Appointment.findByIdAndUpdate(id, { isLeft: !isLeft }, { new: true })

      this.handleSuccess(res, updatedAppointment)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
