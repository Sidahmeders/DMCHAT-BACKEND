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
}
