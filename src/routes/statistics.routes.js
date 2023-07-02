const express = require('express')

const { protect } = require('../middleware')
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
 * /payments/{startDate}/{endDate}:
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
router.route('/:startDate/:endDate').get(protect, statisticsController.fetchPaymentsByDateRange)

module.exports = router
