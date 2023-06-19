module.exports = function updatePatientById({ Patient }) {
  return async function updatePatientById(req, res) {
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
}
