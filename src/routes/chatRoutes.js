const express = require('express')
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers')
const { protect } = require('../middleware')

// Only logged in user can access the below routes
const router = express.Router()

// Both requests work on same route
router.route('/').post(protect, accessChat).get(protect, fetchChats)
// Create group chat
router.route('/group').post(protect, createGroupChat)
// Rename group chat
router.route('/rename').put(protect, renameGroup)
// Add someone to the group
router.route('/groupadd').put(protect, addToGroup)
// Remove someone or leave the group
router.route('/groupremove').put(protect, removeFromGroup)

module.exports = router
