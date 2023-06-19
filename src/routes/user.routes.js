const express = require('express')

const { protect } = require('../middleware')
const { usersControllers } = require('../controllers')

const router = express.Router()

router.route('/').post(usersControllers.registerUser).get(protect, usersControllers.fetchAllUsers)
router.post('/login', usersControllers.authenticateUser)

module.exports = router
