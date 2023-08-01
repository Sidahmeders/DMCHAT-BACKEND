const BaseController = require('./BaseController')

module.exports = class MessageController extends BaseController {
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

      this.handleSuccess(res, messages)
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
        message: 'Données invalides transmises dans la requête',
      })
    }

    try {
      let message = await this.#Message.create({
        sender: req.user._id,
        content,
        chat: chatId,
      })

      message = await (
        await message.populate('sender', 'name pic')
      ).populate({
        path: 'chat',
        select: 'chatName isGroupChat users',
        model: 'Chat',
        populate: { path: 'users', select: 'name email pic createdAt', model: 'User' },
      })

      await this.#Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message })

      this.handleSuccess(res, message)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  deleteMessagesByChatId = async (req, res) => {
    try {
      await this.#Message.deleteMany({ chat: req.params.chatId })

      this.handleSuccess(res)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
