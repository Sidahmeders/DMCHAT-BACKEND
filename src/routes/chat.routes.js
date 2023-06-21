const express = require('express')

const { protect } = require('../middleware')
const { chatController } = require('../controllers')

const router = express.Router()

// Both requests work on same route
router.route('/').post(protect, chatController.accessChat).get(protect, chatController.fetchChats)
// Create group chat
router.route('/group').post(protect, chatController.createGroupChat)
// Rename group chat
router.route('/rename').put(protect, chatController.renameGroup)
// Add someone to the group
router.route('/groupadd').put(protect, chatController.addToGroup)
// Remove someone or leave the group
router.route('/groupremove').put(protect, chatController.removeFromGroup)

module.exports = router
