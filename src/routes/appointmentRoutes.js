const express = require('express')
const { protect } = require('../middleware')
const { createAppointment, fetchMonthAppointments } = require('../controllers/appointmentControllers')

const router = express.Router()

router.route('/:year/:month').get(protect, fetchMonthAppointments)
router.route('/:year/:month/:day').post(protect, createAppointment)

module.exports = router
