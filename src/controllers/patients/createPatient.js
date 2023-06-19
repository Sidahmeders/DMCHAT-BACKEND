module.exports = function makeCreatePatient({ Patient }) {
  return async function createPatient(req, res) {
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
}
