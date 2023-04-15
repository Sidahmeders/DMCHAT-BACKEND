const express = require('express')
const { protect } = require('../middleware')
const { fetchDayCalendar, createCalendarDay } = require('../controllers/calendarControllers')

const router = express.Router()

router.route('/:year/:month/:day').get(protect, fetchDayCalendar)
router.route('/:year/:month/:day').put(protect, createCalendarDay)

module.exports = router
