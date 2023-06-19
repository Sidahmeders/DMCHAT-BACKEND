module.exports = function createSendMessage({ Message, Chat }) {
  return async function sendMessage(req, res) {
    const { content, chatId } = req.body

    if (!content || !chatId) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid data passed into request',
      })
    }

    try {
      // Create a new message
      let message = await Message.create({
        sender: req.user._id, // Logged in user id,
        content,
        chat: chatId,
      })

      message = await (
        await message.populate('sender', 'name pic')
      ).populate({
        path: 'chat',
        select: 'chatName isGroupChat users',
        model: 'Chat',
        populate: { path: 'users', select: 'name email pic', model: 'User' },
      })

      // Update latest message
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message })

      return res.status(200).json(message) // Send message we just created now
    } catch (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Failed to create New Message',
      })
    }
  }
}
