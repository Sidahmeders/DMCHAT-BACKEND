const express = require('express')
const { Endpoints } = require('../config')
const { authenticate, accessControl, validateUserRegistration, validateUserLogin } = require('../middleware')
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
 *     tags: [Users]
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
router.get(Endpoints.USER.GET.fetchUsers, authenticate, accessControl, userController.fetchUsers)

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
router.post(Endpoints.USER.POST.registerUser, validateUserRegistration, userController.registerUser)

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
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                   description: a short lived jwt token to use and when sending the OTP
 *       '400':
 *         description: Invalid email or password
 */
router.post(Endpoints.USER.POST.loginUser, validateUserLogin, userController.loginUser)

/**
 * @swagger
 * /api/users/login-confirmation:
 *   post:
 *     summary: Login Confirmation
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               otpCode:
 *                 type: string
 *             required:
 *               - token
 *               - otpCode
 *     responses:
 *       '200':
 *         description: Successful login confirmation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 pic:
 *                   type: string
 *                 token:
 *                   type: string
 *       '400':
 *         description: Invalid OTP or token not found or timed out
 *       '500':
 *         description: Internal server error
 */
router.post(Endpoints.USER.POST.confirmLogin, userController.confirmLogin)

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
router.post(Endpoints.USER.POST.forgetPassword, userController.forgetPassword)

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
router.post(Endpoints.USER.POST.resetPassword, userController.resetPassword)

/**
 * @openapi
 * /api/users/{userId}:
 *   put:
 *     tags: [Users]
 *     summary: update user data
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Updated created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Failed to update the user
 */
router.put(Endpoints.USER.PUT.updateUser, authenticate, accessControl, userController.updateUser)

/**
 * @openapi
 * /api/users/role/{userId}:
 *   put:
 *     tags: [Users]
 *     summary: update user role
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: Enum('admin', 'doctor', 'assistant', 'unauthorized')
 *     responses:
 *       '200':
 *         description: Updated created successfully
 *       '400':
 *         description: Failed to update the user
 */
router.put(Endpoints.USER.PUT.updateUserRole, authenticate, accessControl, userController.updatedUserRole)

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete
 *     tags: [Users]
 *     responses:
 *      '200':
 *        description: User successfully deleted.
 *      '500':
 *        description: Internal server error occurred.
 */
router.delete(Endpoints.USER.DELETE.deleteUser, authenticate, accessControl, userController.deleteUser)

module.exports = router
