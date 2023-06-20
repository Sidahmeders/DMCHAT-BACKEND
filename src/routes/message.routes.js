const express = require('express')

const { protect } = require('../middleware')
const { messageController } = require('../controllers')

const router = express.Router()

router.route('/').post(protect, messageController.sendMessage)
router.route('/:chatId').get(protect, messageController.fetchMessagesByChatId)

module.exports = router
