const { Patient } = require('../models')

// @description     fetch all Patients
// @route           GET /api/patients
// @access          Protected
const fetchAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
    res.status(200).json(patients)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     fetch patient by id
// @route           GET /api/patients/:id
// @access          Protected
const fetchPatientsById = async (req, res) => {
  try {
    const { id } = req.params
    const patient = await Patient.findById(id)
    res.status(200).json(patient)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     fetch all patient whose name matches the req.params
// @route           GET /api/patients/fullname/:name
// @access          Protected
const fetchPatientsByName = async (req, res) => {
  try {
    const { name } = req.params
    const patients = await Patient.find({ fullName: { $regex: name, $options: 'i' } })
    res.status(200).json(patients)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     Create New Patient
// @route           POST /api/patients
// @access          Protected
const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body)
    res.status(200).json(patient)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     Update Patient by Id
// @route           POST /api/patients/:id
// @access          Protected
const updatePatientById = async (req, res) => {
  try {
    const { id } = req.params
    const patient = await Patient.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(patient)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     Delete Patient by Id
// @route           DELETE /api/patients/:id
// @access          Protected
const deletePatientById = async (req, res) => {
  try {
    const { id } = req.params
    await Patient.findByIdAndDelete(id, req.body)
    res.status(200).end()
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

module.exports = {
  createPatient,
  fetchAllPatients,
  fetchPatientsById,
  fetchPatientsByName,
  updatePatientById,
  deletePatientById,
}
