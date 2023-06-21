const express = require('express')

const { protect } = require('../middleware')
const { userController } = require('../controllers')

const router = express.Router()

router.route('/').post(userController.registerUser).get(protect, userController.fetchAllUsers)
router.post('/login', userController.authenticateUser)

module.exports = router
