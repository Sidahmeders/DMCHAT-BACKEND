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

  fetchPatientsAgeRatio = async (req, res) => {
    try {
      const patients = await this.#Patient.aggregate([
        {
          $group: {
            _id: {
              $switch: {
                branches: [
                  { case: { $and: [{ $gte: ['$age', 4] }, { $lte: ['$age', 18] }] }, then: '4-18' },
                  { case: { $and: [{ $gte: ['$age', 19] }, { $lte: ['$age', 30] }] }, then: '19-30' },
                  { case: { $and: [{ $gte: ['$age', 31] }, { $lte: ['$age', 45] }] }, then: '31-45' },
                ],
                default: '46+',
              },
            },
            count: { $sum: 1 },
          },
        },
        { $project: { _id: 0, name: '$_id', count: 1 } },
      ])

      this.handleSuccess(res, patients)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  fetchPaymentMotifByDateRange = async (req, res) => {
    try {
      const { startDate, endDate } = req.params
      const motifPayments = await this.#Appointment.aggregate([
        {
          $match: {
            startDate: { $gte: new Date(startDate) },
            endDate: { $lte: new Date(endDate) },
          },
        },
        {
          $group: {
            _id: '$motif.value',
            totalPayment: { $sum: '$payment' },
          },
        },
      ])

      this.handleSuccess(res, motifPayments)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
