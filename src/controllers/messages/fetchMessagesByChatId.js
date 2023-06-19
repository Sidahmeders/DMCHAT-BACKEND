module.exports = function makeFetchMessagesByChatId({ Message }) {
  return async function fetchMessagesByChatId(req, res) {
    try {
      const messages = await Message.find({ chat: req.params.chatId })
        .populate('sender', 'name pic email')
        .populate('chat')

      res.status(200).json(messages)
    } catch (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Failed to fetch all Messages',
      })
    }
  }
}
