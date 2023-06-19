module.exports = function createFetchPatientsById({ Patient }) {
  return async function fetchPatientsById(req, res) {
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
}
