const { Appointment } = require('../models')

// @description     fetch all appointments for a given day
// @route           GET /api/appointments/:year/:month/:day
// @access          Protected
const fetchDayAppointments = async (req, res) => {
  try {
    const { year, month, day } = req.params
    const start = new Date(`${year}-${month}-${day}`).setHours(-1)
    const end = new Date(`${year}-${month}-${day}`).setHours(23)
    const dayAppointments = await Appointment.find({ startDate: { $gte: start, $lte: end } }).populate('patient')
    res.status(200).json(dayAppointments)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     fetch all appointments for a given month
// @route           GET /api/appointments/:year/:month
// @access          Protected
const fetchMonthAppointments = async (req, res) => {
  try {
    const { year, month } = req.params
    const allAppointment = await Appointment.find({
      startDate: {
        $gte: new Date(`${year}-${month}-1`),
        $lt: new Date(`${year}-${month}-31`),
      },
    }).populate('patient')

    res.status(200).json(allAppointment)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     fetch all appointments for a given patient
// @route           GET /api/appointments/:patientId
// @access          Protected
const fetchPatientAppointments = async (req, res) => {
  try {
    const { patientId } = req.params
    const patientAppointments = await Appointment.find({ patient: patientId })
    res.status(200).json(patientAppointments)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     create a new appointment
// @route           POST /api/appointments
// @access          Protected
const createNewAppointment = async (req, res) => {
  try {
    const appointment = req.body
    if (!appointment.isNewTreatment) {
      return res.status(400).json({ error: 'This endpoint can only handle new appointments!' })
    }

    let newAppointment = await Appointment.create({
      ...appointment,
      paymentLeft: appointment.totalPrice - (appointment.payment || 0),
    })
    newAppointment = await newAppointment.populate('patient')

    res.status(200).json(newAppointment)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

const relateNewAppointment = async (req, res) => {
  try {
    const appointment = req.body
    if (appointment.isNewTreatment) {
      return res.status(400).json({ error: 'This endpoint can only relate existing appointments!' })
    }

    const baseAppointment = await Appointment.findById(appointment.baseAppointmentId)

    if (!baseAppointment) {
      return res.status(400).json({ error: 'baseAppointment not found!' })
    }

    const { motif, generalState, diagnostic, treatmentPlan, totalPrice } = baseAppointment
    const newPaymentLeft = baseAppointment.paymentLeft - appointment.payment

    const doc = { ...req.body, motif, generalState, diagnostic, treatmentPlan, totalPrice, paymentLeft: newPaymentLeft }
    const newAppointment = await Appointment.create(doc)

    await Appointment.findByIdAndUpdate(appointment.baseAppointmentId, { paymentLeft: newPaymentLeft })

    res.status(200).json(newAppointment)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     toggle "isConfirmed" appointments by Id
// @route           PUT /api/appointments/:id/confirm
// @access          Protected
const confirmAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const { isConfirmed } = req.body
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { isConfirmed: !isConfirmed }, { new: true })
    res.status(200).json(updatedAppointment)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     toggle "isLeft" appointments by Id
// @route           PUT /api/appointments/:id/leave
// @access          Protected
const leaveAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const { isLeft } = req.body
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { isLeft: !isLeft }, { new: true })
    res.status(200).json(updatedAppointment)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     update appointments status
// @route           PUT /api/appointments/:id/update
// @access          Protected
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true }).populate('patient')
    res.status(200).json(updatedAppointment)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     update a list of given appointments
// @route           PUT /api/appointments/history
// @access          Protected
const updateAppointmentsHistory = async (req, res) => {
  try {
    const appointments = req.body

    await Appointment.bulkWrite(
      appointments.map((appointment) => ({
        updateOne: {
          filter: { _id: appointment._id },
          update: appointment,
        },
      })),
    )

    res.status(200).json(appointments)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

// @description     delete appointments by Id
// @route           DELETE /api/appointments/:id
// @access          Protected
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params
    const deletedAppointment = await Appointment.findByIdAndDelete(id, { new: true })
    res.status(200).json(deletedAppointment)
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: error.message,
    })
  }
}

module.exports = {
  fetchDayAppointments,
  updateAppointmentsHistory,
  fetchMonthAppointments,
  fetchPatientAppointments,
  createNewAppointment,
  relateNewAppointment,
  confirmAppointment,
  leaveAppointment,
  updateAppointment,
  deleteAppointment,
}
