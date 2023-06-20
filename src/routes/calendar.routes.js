const express = require('express')

const { protect } = require('../middleware')
const { calendarController } = require('../controllers')

const router = express.Router()

router.route('/:year/:month/:day').get(protect, calendarController.fetchDayCalendar)

router.route('/:year/:month/:day').put(protect, calendarController.setCalendarDayAvailability)

module.exports = router
