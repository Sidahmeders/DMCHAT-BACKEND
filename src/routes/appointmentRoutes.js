const express = require('express')
const { protect } = require('../middleware')
const {
  fetchMonthAppointments,
  fetchDayAppointments,
  fetchPatientAppointments,
  createNewAppointment,
  relateNewAppointment,
  confirmAppointment,
  leaveAppointment,
  updateAppointment,
  updateAppointmentsHistory,
  deleteAppointment,
} = require('../controllers/appointmentControllers')

const router = express.Router()

router.route('/:patientId').get(protect, fetchPatientAppointments)
router.route('/:year/:month').get(protect, fetchMonthAppointments)
router.route('/:year/:month/:day').get(protect, fetchDayAppointments)

router.route('/new').post(protect, createNewAppointment)
router.route('/relate').post(protect, relateNewAppointment)

router.route('/:id/confirm').put(protect, confirmAppointment)
router.route('/:id/leave').put(protect, leaveAppointment)
router.route('/:id/update').put(protect, updateAppointment)
router.route('/history').put(protect, updateAppointmentsHistory)

router.route('/:id').delete(protect, deleteAppointment)

module.exports = router
