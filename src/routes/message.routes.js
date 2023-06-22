const express = require('express')

const { protect } = require('../middleware')
const { messageController } = require('../controllers')

/**
 * @openapi
 * tags:
 *   - name: Messages
 *     description: API endpoints for managing messages
 */
const router = express.Router()

/**
 * @openapi
 * /api/messages/{chatId}:
 *   get:
 *     summary: Fetch messages by chat ID
 *     tags: [Messages]
 *     description: Retrieve messages based on the specified chat ID
 *     parameters:
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: string
 *         description: The ID of the chat
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       '400':
 *         description: Bad request
 */
router.route('/:chatId').get(protect, messageController.fetchMessagesByChatId)

/**
 * @openapi
 * /api/messages:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     description: Send a message to a chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the message
 *               chatId:
 *                 type: string
 *                 description: The ID of the chat to send the message to
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       '400':
 *         description: Bad request
 */
router.route('/').post(protect, messageController.sendMessage)

module.exports = router
