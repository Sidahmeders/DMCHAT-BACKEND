const express = require('express')
const { Endpoints } = require('../config')
const { authenticate, accessControl } = require('../middleware')
const { statisticsController } = require('../controllers')

/**
 * @openapi
 * tags:
 *   name: Statistics
 *   description: API endpoints for fetching Statistics data
 */
const router = express.Router()

/**
 * @openapi
 * /api/statistics/{startDate}/{endDate}/payments-revenue:
 *   get:
 *     summary: Get payments within a specific date range
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: startDate
 *         schema:
 *           type: string
 *         required: true
 *         description: Start date of the payment range
 *       - in: path
 *         name: endDate
 *         schema:
 *           type: string
 *         required: true
 *         description: End date of the payment range
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       '400':
 *         description: Invalid request parameters.
 *       '500':
 *         description: Internal server error occurred.
 */
router.get(
  Endpoints.STATISTIC.GET.fetchPaymentsByDateRange,
  authenticate,
  accessControl,
  statisticsController.fetchPaymentsByDateRange,
)

/**
 * @swagger
 * /api/statistics/{startDate}/{endDate}/appointments-revenue:
 *   get:
 *     summary: Fetch appointments revenue by date range
 *     tags: [Statistics]
 *     parameters:
 *       - name: startDate
 *         in: path
 *         description: Start date of the date range
 *         required: true
 *         schema:
 *           type: string
 *       - name: endDate
 *         in: path
 *         description: End date of the date range
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPrice:
 *                   type: number
 *                   description: Total price of all appointments within the date range
 *                 totalPayments:
 *                   type: number
 *                   description: Total payments received for all appointments within the date range
 *                 paymentLeft:
 *                   type: number
 *                   description: Total payment left for all appointments within the date range
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.get(
  Endpoints.STATISTIC.GET.fetchAppointmentsRevenueByDateRange,
  authenticate,
  accessControl,
  statisticsController.fetchAppointmentsRevenueByDateRange,
)

/**
 * @swagger
 * /api/statistics/patients/age-ratio:
 *   get:
 *     summary: Fetch Patients Age Ratio
 *     tags: [Statistics]
 *     description: Retrieve statistics on the age ratio of patients.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Age range name.
 *                   count:
 *                     type: integer
 *                     description: Number of patients in the age range.
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.get(Endpoints.STATISTIC.GET.fetchPatientsAgeRatio, statisticsController.fetchPatientsAgeRatio)

router.get(Endpoints.STATISTIC.GET.fetchPatientsAgeRatio, statisticsController.fetchPatientsAgeRatio)

module.exports = router
