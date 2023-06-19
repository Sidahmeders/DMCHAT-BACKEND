module.exports = function createFetchPatientsByName({ Patient }) {
  return async function fetchPatientsByName(req, res) {
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
}
