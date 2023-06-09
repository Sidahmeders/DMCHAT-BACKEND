const express = require('express')
const { Endpoints } = require('../config')
const { authenticate, accessControl } = require('../middleware')
const { paymentController } = require('../controllers')

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: API endpoints for managing payments
 */
const router = express.Router()

/**
 * @swagger
 * /api/payments/{year}/{month}/{day}:
 *   get:
 *     summary: Fetch payments for a specific day
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: The year of the payment date
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *         description: The month of the payment date
 *       - in: path
 *         name: day
 *         required: true
 *         schema:
 *           type: integer
 *         description: The day of the payment date
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response with day payments
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
router.get(Endpoints.PAYMENT.GET.fetchDayPayments, authenticate, accessControl, paymentController.fetchDayPayments)

/**
 * @swagger
 * /api/payments/{year}/{month}/{day}:
 *   post:
 *     summary: Create a new payment for a specific day
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: The year of the payment date
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *         description: The month of the payment date
 *       - in: path
 *         name: day
 *         required: true
 *         schema:
 *           type: integer
 *         description: The day of the payment date
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       '201':
 *         description: Successful response with the created payment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       '400':
 *         description: Invalid request parameters.
 *       '500':
 *         description: Internal server error occurred.
 */
router.post(Endpoints.PAYMENT.POST.createPayment, authenticate, accessControl, paymentController.createPayment)

module.exports = router
