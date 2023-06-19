module.exports = function makeFetchAllPatients({ Patient }) {
  return async function fetchAllPatients(req, res) {
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
}
