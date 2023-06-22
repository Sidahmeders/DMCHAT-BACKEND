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
        .skip((page - 1) * pageSize)
        .limit(pageSize)

      const patientsData = {
        patients,
        page,
        pageSize,
        totalCount,
        totalPages,
      }

      res.status(200).json(patientsData)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  fetchPatientsById = async (req, res) => {
    try {
      const { id } = req.params
      const patient = await this.#Patient.findById(id)
      res.status(200).json(patient)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  createPatient = async (req, res) => {
    try {
      const patient = await this.#Patient.create(req.body)
      res.status(200).json(patient)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  updatePatientById = async (req, res) => {
    try {
      const { id } = req.params
      const patient = await this.#Patient.findByIdAndUpdate(id, req.body, { new: true })
      res.status(200).json(patient)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  deletePatientById = async (req, res) => {
    try {
      const { id } = req.params
      await this.#Patient.findByIdAndDelete(id, req.body)
      res.status(200).end()
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
