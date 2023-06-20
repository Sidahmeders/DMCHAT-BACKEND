module.exports = function makeFetchPatients({ Patient }) {
  return async function fetchPatients(req, res) {
    try {
      const page = parseInt(req.query.page) || 1
      const pageSize = parseInt(req.query.pageSize) || 10

      const totalCount = await Patient.countDocuments()
      const totalPages = Math.ceil(totalCount / pageSize)

      const patients = await Patient.find()
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
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.message,
      })
    }
  }
}
