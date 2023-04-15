const { Appointment } = require('../models')

// @description     fetch all appointments for a given month
// @route           GET /api/calendar/:year/:month
// @access          Protected
const fetchMonthAppointments = async (req, res) => {
  try {
    const { year, month } = req.params
    const startDate = new Date(`${year}-${month}-1`)
    const endDate = new Date(`${year}-${month}-31`)
    const allAppointment = await Appointment.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    })
    res.status(200).json(allAppointment)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     create a new appointment
// @route           POST /api/calendar/:year/:month/:day
// @access          Protected
const createAppointment = async (req, res) => {
  try {
    const { year, month, day } = req.params
    const newAppointment = await Appointment.create({
      ...req.body,
      date: new Date(`${year}-${month}-${day}`),
    })
    res.status(200).json(newAppointment)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

module.exports = {
  fetchMonthAppointments,
  createAppointment,
}
