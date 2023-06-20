const express = require('express')
const { protect } = require('../middleware')
const { appointmentsControllers } = require('../controllers')

/**
 * @openapi
 * tags:
 *   name: Appointments
 *   description: API endpoints for managing appointments
 */

const router = express.Router()

/**
 * @openapi
 * /api/appointments/{patientId}:
 *   get:
 *     summary: Fetch appointments for a patient
 *     description: Retrieve appointments for a specific patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient
 *     responses:
 *       '200':
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       '404':
 *         description: Patient not found
 */
router.get('/:patientId', protect, appointmentsControllers.fetchPatientAppointments)

/**
 * @openapi
 * /api/appointments/{year}/{month}:
 *   get:
 *     summary: Fetch appointments for a specific month
 *     description: Retrieve appointments for a specific month and year
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *         description: The year of the appointments
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *         description: The month of the appointments
 *     responses:
 *       '200':
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       '400':
 *         description: Invalid year or month format
 */
router.get('/:year/:month', protect, appointmentsControllers.fetchMonthAppointments)

/**
 * @openapi
 * /api/appointments/{year}/{month}/{day}:
 *   get:
 *     summary: Fetch appointments for a specific day
 *     description: Retrieve appointments for a specific day, month, and year
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *         description: The year of the appointments
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *         description: The month of the appointments
 *       - in: path
 *         name: day
 *         required: true
 *         schema:
 *           type: string
 *         description: The day of the appointments
 *     responses:
 *       '200':
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 *       '400':
 *         description: Invalid year, month, or day format
 */
router.get('/:year/:month/:day', protect, appointmentsControllers.fetchDayAppointments)

/**
 * @openapi
 * /api/appointments/new:
 *   post:
 *     summary: Create a new appointment
 *     description: Create a new appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       '201':
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       '400':
 *         description: Invalid appointment data
 */
router.post('/new', protect, appointmentsControllers.createNewAppointment)

/**
 * @openapi
 * /api/appointments/relate:
 *   post:
 *     summary: Relate a new appointment
 *     description: Relate a new appointment to an existing appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       '201':
 *         description: Appointment related successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       '400':
 *         description: Invalid appointment data or related appointment does not exist
 */
router.post('/relate', protect, appointmentsControllers.relateNewAppointment)

/**
 * @openapi
 * /api/appointments/{id}/toggle-confirmation:
 *   put:
 *     summary: Toggle appointment confirmation
 *     description: Toggle the confirmation status of an appointment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isConfirmed:
 *                 type: boolean
 *             example:
 *               isConfirmed: true
 *     responses:
 *       '200':
 *         description: Appointment confirmation toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       '400':
 *         description: Invalid appointment ID or request body
 *       '404':
 *         description: Appointment not found
 */
router.put('/:id/toggle-confirmation', protect, appointmentsControllers.toggleConfirmation)

/**
 * @openapi
 * /api/appointments/{id}/toggle-leave:
 *   put:
 *     summary: Toggle appointment leave status
 *     description: Toggle the leave status of an appointment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isLeft:
 *                 type: boolean
 *             example:
 *               isLeft: true
 *     responses:
 *       '200':
 *         description: Appointment leave status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       '400':
 *         description: Invalid appointment ID or request body
 *       '404':
 *         description: Appointment not found
 */
router.put('/:id/toggle-leave', protect, appointmentsControllers.toggleLeave)

/**
 * @openapi
 * /api/appointments/{id}/update:
 *   put:
 *     summary: Update an appointment
 *     description: Update an appointment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       '200':
 *         description: Appointment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       '400':
 *         description: Invalid appointment ID or data
 *       '404':
 *         description: Appointment not found
 */
router.put('/:id/update', protect, appointmentsControllers.updateAppointment)

/**
 * @openapi
 * /api/appointments/history:
 *   put:
 *     summary: Update appointments history
 *     description: Update the history of multiple appointments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Appointment'
 *     responses:
 *       '200':
 *         description: Appointments history updated successfully
 *       '400':
 *         description: Invalid appointment data
 */
router.put('/history', protect, appointmentsControllers.updateAppointmentsHistory)

/**
 * @openapi
 * /api/appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     description: Delete an appointment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the appointment
 *     responses:
 *       '200':
 *         description: Appointment deleted successfully
 *       '400':
 *         description: Invalid appointment ID
 *       '404':
 *         description: Appointment not found
 */
router.delete('/:id', protect, appointmentsControllers.deleteAppointment)

module.exports = router
