const express = require('express')
const { protect } = require('../middleware')
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require('../controllers/chatControllers')

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
