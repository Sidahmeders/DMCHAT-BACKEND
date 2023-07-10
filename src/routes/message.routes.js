const express = require('express')
const { Endpoints } = require('../config')
const { authenticate, accessControl } = require('../middleware')
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
router.get(
  Endpoints.MESSAGE.GET.fetchMessagesByChatId,
  authenticate,
  accessControl,
  messageController.fetchMessagesByChatId,
)

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
router.post(Endpoints.MESSAGE.POST.sendMessage, authenticate, accessControl, messageController.sendMessage)

/**
 * @swagger
 * /api/messages/{chatId}:
 *   delete:
 *     summary: Delete messages by chat ID
 *     tags: [Messages]
 *     description: Deletes all messages associated with a specific chat ID.
 *     parameters:
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the chat whose messages should be deleted.
 *     responses:
 *      '200':
 *        description: Messages successfully deleted.
 *      '400':
 *        description: Invalid request parameters.
 *      '500':
 *        description: Internal server error occurred.
 */
router.delete(
  Endpoints.MESSAGE.DELETE.deleteMessagesByChatId,
  authenticate,
  accessControl,
  messageController.deleteMessagesByChatId,
)

module.exports = router
