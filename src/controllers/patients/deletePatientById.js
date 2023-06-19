module.exports = function makeDeletePatientById({ Patient }) {
  return async function deletePatientById(req, res) {
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
}
