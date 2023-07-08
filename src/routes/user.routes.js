const express = require('express')
const { authenticate } = require('../middleware')
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
router.route('/').get(authenticate, userController.fetchAllUsers)

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

/**
 * @openapi
 * /api/users/forget-password:
 *   post:
 *     tags: [Users]
 *     summary: Send email for password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Invalid email
 */
router.post('/forget-password', userController.forgetPassword)

/**
 * @openapi
 * /reset-password/{token}:
 *   post:
 *     summary: Reset user password.
 *     description: Reset user password using a valid reset token.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         description: Reset token received by the user.
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: newPassword
 *         description: The new password to set.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             password1:
 *               type: string
 *             password2:
 *               type: string
 *     responses:
 *       200:
 *         description: Password reset successful.
 *       400:
 *         description: Invalid or expired reset token.
 *       500:
 *         description: An error occurred while resetting the password.
 */
router.post('/reset-password/:token', userController.resetPassword)

module.exports = router
