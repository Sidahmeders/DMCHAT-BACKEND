const express = require('express')
const { Endpoints } = require('../config')
const { authenticate, accessControl } = require('../middleware')
const { calendarController } = require('../controllers')

/**
 * @openapi
 * tags:
 *   name: Calendar
 *   description: API endpoints for managing the calendar
 */
const router = express.Router()

/**
 * @openapi
 * /api/calendar/{year}/{month}/availability:
 *   get:
 *     summary: Fetch month calendar Availability
 *     tags: [Calendar]
 *     description: Retrieve the calendar availabilities for a specific month
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: The year of the calendar
 *       - in: path
 *         name: month
 *         schema:
 *           type: integer
 *         required: true
 *         description: The month of the calendar
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calendar'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Calendar not found
 */
router.get(
  Endpoints.CALENDAR.GET.fetchMonthCalendarAvailability,
  authenticate,
  accessControl,
  calendarController.fetchMonthCalendarAvailability,
)

/**
 * @openapi
 * /api/calendar/{year}/{month}/{day}/availability:
 *   put:
 *     summary: Set calendar day availability
 *     tags: [Calendar]
 *     description: Set the availability of a specific day on the calendar
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: The year of the calendar
 *       - in: path
 *         name: month
 *         schema:
 *           type: integer
 *         required: true
 *         description: The month of the calendar
 *       - in: path
 *         name: day
 *         schema:
 *           type: integer
 *         required: true
 *         description: The day of the calendar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Calendar'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calendar'
 *       '201':
 *         description: Calendar day created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Calendar'
 *       '400':
 *         description: Bad request
 */
router.put(
  Endpoints.CALENDAR.PUT.setCalendarDayAvailability,
  authenticate,
  accessControl,
  calendarController.setCalendarDayAvailability,
)

module.exports = router
