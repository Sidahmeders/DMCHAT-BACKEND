const express = require('express')

const { protect } = require('../middleware')
const { chatController } = require('../controllers')

/**
 * @openapi
 * tags:
 *   name: Chats
 *   description: API endpoints for managing the chats
 */
const router = express.Router()

/**
 * @openapi
 * /api/chat:
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
router.route('/').get(protect, chatController.fetchUserChats)

/**
 * @openapi
 * /api/chat:
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
router.route('/access').post(protect, chatController.accessChat)

/**
 * @openapi
 * /api/chat/groups:
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
router.route('/groups').post(protect, chatController.createGroupChat)

/**
 * @openapi
 * /api/chat/groups/rename:
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
router.route('/groups/rename').put(protect, chatController.renameGroup)

/**
 * @openapi
 * /api/chat/groups/join:
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
router.route('/groups/join').put(protect, chatController.addToGroup)

/**
 * @openapi
 * /api/chat/groups/leave:
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
router.route('/groups/leave').put(protect, chatController.removeFromGroup)

module.exports = router
