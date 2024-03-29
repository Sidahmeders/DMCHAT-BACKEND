const express = require('express')
const { Endpoints } = require('../config')
const { authenticate, accessControl } = require('../middleware')
const { chatController } = require('../controllers')

/**
 * @openapi
 * tags:
 *   name: Chats
 *   description: API endpoints for managing the chats
 */
const router = express.Router()

/**
 * @swagger
 * /chats/group:
 *   get:
 *     summary: Fetch group chats
 *     description: Retrieve a list of all the group chats.
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK. List of chats fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *       '401':
 *         description: Unauthorized Error
 *       '500':
 *         description: Internal Server Error
 */
router.get('/chats/group', authenticate, accessControl, chatController.fetchGroupChats)

/**
 * @openapi
 * /api/chats:
 *   get:
 *     summary: Fetch User chats
 *     description: Retrieve a list of all chats for the logged in user.
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK. List of chats fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *       '401':
 *         description: Unauthorized Error
 *       '500':
 *         description: Internal Server Error
 */
router.get(Endpoints.CHAT.GET.fetchUserChats, authenticate, accessControl, chatController.fetchUserChats)

/**
 * @openapi
 * /api/chats:
 *   post:
 *     summary: Access a chat
 *     description: Access a chat by providing the user's ID.
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *             required:
 *               - userId
 *     responses:
 *       '200':
 *         description: OK. Chat accessed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       '400':
 *         description: Bad Request. User ID not provided.
 *       '401':
 *         description: Unauthorized Error
 *       '404':
 *         description: Not Found. Chat not found.
 *       '500':
 *         description: Internal Server Error
 */
router.post(Endpoints.CHAT.POST.accessChat, authenticate, accessControl, chatController.accessChat)

/**
 * @openapi
 * /api/chats/group:
 *   post:
 *     summary: Create a group chat
 *     description: Create a new group chat.
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - users
 *               - name
 *     responses:
 *       '200':
 *         description: OK. Group chat created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       '400':
 *         description: Bad Request. Missing required fields or insufficient users for group chat.
 *       '401':
 *         description: Unauthorized Error
 *       '500':
 *         description: Internal Server Error
 */
router.post(Endpoints.CHAT.POST.createGroupChat, authenticate, accessControl, chatController.createGroupChat)

/**
 * @openapi
 * /api/chats/group/rename:
 *   put:
 *     summary: Rename a group chat
 *     description: Rename an existing group chat.
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatId:
 *                 type: string
 *               chatName:
 *                 type: string
 *             required:
 *               - chatId
 *               - chatName
 *     responses:
 *       '200':
 *         description: OK. Group chat renamed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       '401':
 *         description: Unauthorized Error
 *       '404':
 *         description: Not Found. Chat not found.
 *       '500':
 *         description: Internal Server Error
 */
router.put(Endpoints.CHAT.PUT.renameGroup, authenticate, accessControl, chatController.renameGroup)

/**
 * @openapi
 * /api/chats/group/join:
 *   put:
 *     summary: Join a user to a group chat
 *     description: Add a user to an existing group chat.
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatId:
 *                 type: string
 *               userId:
 *                 type: string
 *             required:
 *               - chatId
 *               - userId
 *     responses:
 *       '200':
 *         description: OK. User added to group chat successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       '401':
 *         description: Unauthorized Error
 *       '404':
 *         description: Not Found. Chat not found.
 *       '500':
 *         description: Internal Server Error
 */
router.put(Endpoints.CHAT.PUT.addToGroup, authenticate, accessControl, chatController.addToGroup)

/**
 * @openapi
 * /api/chats/group/leave:
 *   put:
 *     summary: Remove a user from a group chat
 *     description: Remove a user from an existing group chat.
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatId:
 *                 type: string
 *               userId:
 *                 type: string
 *             required:
 *               - chatId
 *               - userId
 *     responses:
 *       '200':
 *         description: OK. User removed from group chat successfully.
 *       '401':
 *         description: Unauthorized Error.
 *       '404':
 *         description: Not Found. Chat not found.
 *       '500':
 *         description: Internal Server Error.
 */
router.put(Endpoints.CHAT.PUT.removeFromGroup, authenticate, accessControl, chatController.removeFromGroup)

/**
 * @openapi
 * /api/chats/{chatId}:
 *   delete:
 *     summary: Delete Chat by ID
 *     tags: [Chats]
 *     description: Delete a Chat specified by ID
 *     parameters:
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the Chat to delete
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Chat not found
 */
router.delete(Endpoints.CHAT.DELETE.deleteChatById, authenticate, accessControl, chatController.deleteChatById)

module.exports = router
