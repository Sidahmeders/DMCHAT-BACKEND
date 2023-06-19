const express = require('express')

const { protect } = require('../middleware')
const { messageControllers } = require('../controllers')

const router = express.Router()

router.route('/').post(protect, messageControllers.sendMessage)
router.route('/:chatId').get(protect, messageControllers.fetchMessagesByChatId)

module.exports = router
