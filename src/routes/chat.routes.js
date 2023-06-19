const express = require('express')

const { protect } = require('../middleware')
const { chatControllers } = require('../controllers')

const router = express.Router()

// Both requests work on same route
router.route('/').post(protect, chatControllers.accessChat).get(protect, chatControllers.fetchChats)
// Create group chat
router.route('/group').post(protect, chatControllers.createGroupChat)
// Rename group chat
router.route('/rename').put(protect, chatControllers.renameGroup)
// Add someone to the group
router.route('/groupadd').put(protect, chatControllers.addToGroup)
// Remove someone or leave the group
router.route('/groupremove').put(protect, chatControllers.removeFromGroup)

module.exports = router
