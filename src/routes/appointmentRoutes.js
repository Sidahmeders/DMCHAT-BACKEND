const express = require('express')
const { protect } = require('../middleware')
const {
  fetchMonthAppointments,
  fetchDayAppointments,
  fetchPatientAppointments,
  createAppointment,
  confirmAppointment,
  leaveAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentControllers')

const router = express.Router()

router.route('/:patientId').get(protect, fetchPatientAppointments)
router.route('/:year/:month').get(protect, fetchMonthAppointments)
router.route('/:year/:month/:day').get(protect, fetchDayAppointments)

router.route('/').post(protect, createAppointment)

router.route('/:id/confirm').put(protect, confirmAppointment)
router.route('/:id/leave').put(protect, leaveAppointment)
router.route('/:id/update').put(protect, updateAppointment)

router.route('/:id').delete(protect, deleteAppointment)

module.exports = router
