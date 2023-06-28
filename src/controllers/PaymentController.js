const BaseController = require('./BaseController')

module.exports = class PaymentController extends BaseController {
  #Payment

  constructor({ Payment }) {
    super()
    this.#Payment = Payment
  }

  fetchDayPayments = async (req, res) => {
    try {
      const { year, month, day } = req.params
      const dayPayments = await this.#Payment.find({ date: new Date(`${year}-${month}-${day}`) })

      this.handleSuccess(res, dayPayments)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  createPayment = async (req, res) => {
    try {
      const { year, month, day } = req.params
      const payment = await this.#Payment.create({
        ...req.body,
        date: new Date(`${year}-${month}-${day}`),
      })

      this.handleSuccess(res, payment)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
