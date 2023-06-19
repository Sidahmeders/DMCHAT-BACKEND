const express = require('express')

const { protect } = require('../middleware')
const { calendarControllers } = require('../controllers')

const router = express.Router()

router.route('/:year/:month/:day').get(protect, calendarControllers.fetchDayCalendar)

router.route('/:year/:month/:day').put(protect, calendarControllers.setCalendarDayAvailability)

module.exports = router
