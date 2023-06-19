module.exports = function makeRenameGroup({ Chat }) {
  return async function renameGroup(req, res) {
    const { chatId, chatName } = req.body

    // Check if the requester is admin
    const isAdmin = await Chat.findOne({ groupAdmin: req.user._id }).exec()
    if (!isAdmin) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'You are not authorized',
      })
    }

    try {
      const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName: chatName }, { new: true })
        .populate('users', '-password')
        .populate('groupAdmin', '-password')

      if (!updatedChat) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: 'Chat Not Found',
        })
      } else {
        return res.status(200).json(updatedChat)
      }
    } catch (error) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: error.message,
      })
    }
  }
}
