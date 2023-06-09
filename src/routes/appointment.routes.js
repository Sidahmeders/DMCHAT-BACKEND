const express = require('express')
const { Endpoints } = require('../config')
const { authenticate, accessControl, validateAppointment } = require('../middleware')
const { appointmentController } = require('../controllers')

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
 *     tags: [Appointments]
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
router.get(
  Endpoints.APPOINTMENT.GET.fetchPatientAppointments,
  authenticate,
  accessControl,
  appointmentController.fetchPatientAppointments,
)

/**
 * @openapi
 * /api/appointments/{year}/{month}:
 *   get:
 *     summary: Fetch appointments for a specific month
 *     tags: [Appointments]
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
router.get(
  Endpoints.APPOINTMENT.GET.fetchMonthAppointments,
  authenticate,
  accessControl,
  appointmentController.fetchMonthAppointments,
)

/**
 * @openapi
 * /api/appointments/{year}/{month}/{day}:
 *   get:
 *     summary: Fetch appointments for a specific day
 *     tags: [Appointments]
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
router.get(
  Endpoints.APPOINTMENT.GET.fetchDayAppointments,
  authenticate,
  accessControl,
  appointmentController.fetchDayAppointments,
)

/**
 * @openapi
 * /api/appointments/new:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
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
router.post(
  Endpoints.APPOINTMENT.POST.createNewAppointment,
  authenticate,
  accessControl,
  validateAppointment,
  appointmentController.createNewAppointment,
)

/**
 * @openapi
 * /api/appointments/relate:
 *   post:
 *     summary: Relate a new appointment
 *     tags: [Appointments]
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
router.post(
  Endpoints.APPOINTMENT.POST.relateNewAppointment,
  authenticate,
  accessControl,
  validateAppointment,
  appointmentController.relateNewAppointment,
)

/**
 * @openapi
 * /api/appointments/{id}/toggle-confirmation:
 *   put:
 *     summary: Toggle appointment confirmation
 *     tags: [Appointments]
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
router.put(
  Endpoints.APPOINTMENT.PUT.toggleConfirmation,
  authenticate,
  accessControl,
  appointmentController.toggleConfirmation,
)

/**
 * @openapi
 * /api/appointments/{id}/toggle-leave:
 *   put:
 *     summary: Toggle appointment leave status
 *     tags: [Appointments]
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
router.put(Endpoints.APPOINTMENT.PUT.toggleLeave, authenticate, accessControl, appointmentController.toggleLeave)

/**
 * @openapi
 * /api/appointments/{id}/update:
 *   put:
 *     summary: Update an appointment
 *     tags: [Appointments]
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
router.put(
  Endpoints.APPOINTMENT.PUT.updateAppointment,
  authenticate,
  accessControl,
  appointmentController.updateAppointment,
)

/**
 * @openapi
 * /api/appointments/{id}/update-sync:
 *   put:
 *     summary: Update an appointment and synchronize treatment
 *     tags: [Appointments]
 *     description: Update an appointment and synchronize between appointment updates by baseAppointmentId
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
router.put(
  Endpoints.APPOINTMENT.PUT.updateAppointmentSync,
  authenticate,
  accessControl,
  appointmentController.updateAppointmentSync,
)

/**
 * @openapi
 * /api/appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
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
router.delete(
  Endpoints.APPOINTMENT.DELETE.deleteAppointment,
  authenticate,
  accessControl,
  appointmentController.deleteAppointment,
)

module.exports = router
