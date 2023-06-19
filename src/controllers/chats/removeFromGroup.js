module.exports = function createRemoveFromGroup({ Chat }) {
  return async function removeFromGroup(req, res) {
    const { chatId, userId } = req.body

    // Check if the requester is admin
    const isAdmin = await Chat.findOne({ groupAdmin: req.user._id }).exec()
    if (!isAdmin) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'You are not authorized',
      })
    }

    const removed = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')

    if (!removed) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Chat Not Found',
      })
    } else {
      return res.status(200).json(removed)
    }
  }
}
