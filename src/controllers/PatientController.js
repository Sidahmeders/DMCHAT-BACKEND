const BaseController = require('./BaseController')

module.exports = class PatientController extends BaseController {
  #Patient

  constructor({ Patient }) {
    super()
    this.#Patient = Patient
  }

  fetchPatients = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1
      const pageSize = parseInt(req.query.pageSize) || 10
      const fullName = req.query.fullName || ''
      const totalCount = await this.#Patient.countDocuments()
      const totalPages = Math.ceil(totalCount / pageSize)

      const patients = await this.#Patient
        .find({ fullName: { $regex: fullName, $options: 'i' } })
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)

      const patientsData = {
        patients,
        page,
        pageSize,
        totalCount,
        totalPages,
      }

      this.handleSuccess(res, patientsData)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  fetchPatientsById = async (req, res) => {
    try {
      const { id } = req.params
      const patient = await this.#Patient.findById(id)

      this.handleSuccess(res, patient)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  createPatient = async (req, res) => {
    try {
      const patient = await this.#Patient.create(req.body)

      this.handleSuccess(res, patient)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  updatePatientById = async (req, res) => {
    try {
      const { id } = req.params
      const patient = await this.#Patient.findByIdAndUpdate(id, req.body, { new: true })

      this.handleSuccess(res, patient)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  deletePatientById = async (req, res) => {
    try {
      const { id } = req.params
      await this.#Patient.findByIdAndDelete(id, req.body)

      this.handleSuccess(res)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
