const express = require('express')
const { protect } = require('../middleware')
const {
  createAppointment,
  fetchMonthAppointments,
  fetchDayAppointments,
  confirmAppointment,
  leaveAppointment,
  updateAppointment,
} = require('../controllers/appointmentControllers')

const router = express.Router()

router.route('/:year/:month/:day').get(protect, fetchDayAppointments)
router.route('/:year/:month').get(protect, fetchMonthAppointments)
router.route('/:year/:month/:day').post(protect, createAppointment)
router.route('/:id/confirm').put(protect, confirmAppointment)
router.route('/:id/leave').put(protect, leaveAppointment)
router.route('/:id/update').put(protect, updateAppointment)

module.exports = router
