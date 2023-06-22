const express = require('express')

const { protect } = require('../middleware')
const { userController } = require('../controllers')

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */
const router = express.Router()

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Fetch all users
 *     description: Retrieve a list of all users, optionally filtered by a search query.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Optional. Search query to filter users by name or email.
 *     responses:
 *       '200':
 *         description: OK. List of users fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.route('/').get(protect, userController.fetchAllUsers)

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags: [Users]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Failed to create the user
 */
router.route('/').post(userController.registerUser)

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     tags: [Users]
 *     summary: Authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid email or password
 */
router.post('/login', userController.authenticateUser)

module.exports = router
