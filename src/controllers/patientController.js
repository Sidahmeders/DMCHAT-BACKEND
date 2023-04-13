const { Patient } = require('../models')

// @description     Create New Patient
// @route           POST /api/patient/
// @access          Protected
const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body)
    return res.status(200).json(patient)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     fetch all patient whose name matches the req.params
// @route           POST /api/patient/:name
// @access          Protected
const fetchPatientsByName = async (req, res) => {
  try {
    const { name } = req.params
    const patients = await Patient.find({ fullName: { $regex: name, $options: 'i' } })
    res.status(200).json(patients)
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  createPatient,
  fetchPatientsByName,
}
