const BaseController = require('./BaseController')

module.exports = class StatisticsController extends BaseController {
  #Patient
  #Payment
  #Appointment

  constructor({ Patient, Payment, Appointment }) {
    super()
    this.#Patient = Patient
    this.#Payment = Payment
    this.#Appointment = Appointment
  }

  fetchPaymentsByDateRange = async (req, res) => {
    try {
      const { startDate, endDate } = req.params
      const paymentsData = await this.#Payment.find({ date: { $gte: startDate, $lte: endDate } })

      this.handleSuccess(res, paymentsData)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  fetchAppointmentsRevenueByDateRange = async (req, res) => {
    try {
      const startDate = new Date(req.params.startDate)
      const endDate = new Date(req.params.endDate)
      const result = await this.#Appointment.aggregate([
        {
          $match: {
            baseAppointmentId: null,
            startDate: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: null,
            totalPrice: { $sum: '$totalPrice' },
            totalPayments: { $sum: '$payment' },
            paymentLeft: { $sum: '$paymentLeft' },
          },
        },
      ])

      this.handleSuccess(res, { ...result[0] })
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
