const BaseController = require('./BaseController')

module.exports = class CalendarController extends BaseController {
  #Message
  #Chat

  constructor({ Message, Chat }) {
    super()
    this.#Message = Message
    this.#Chat = Chat
  }

  fetchMessagesByChatId = async (req, res) => {
    try {
      const messages = await this.#Message
        .find({ chat: req.params.chatId })
        .populate('sender', 'name pic email')
        .populate('chat')

      res.status(200).json(messages)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  sendMessage = async (req, res) => {
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
      let message = await this.#Message.create({
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
      await this.#Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message })

      return res.status(200).json(message) // Send message we just created now
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
