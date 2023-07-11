const BaseController = require('./BaseController')

module.exports = class ChatController extends BaseController {
  #Chat
  #User

  constructor({ Chat, User }) {
    super()
    this.#Chat = Chat
    this.#User = User
  }

  accessChat = async (req, res) => {
    try {
      const { userId } = req.body

      if (!userId) {
        return this.handleError(res, {
          statusCode: 400,
          message: 'UserId param not sent with request',
        })
      }

      let chatExists = await this.#Chat
        .find({
          // isGroupChat will be false as it is one-to-one chat
          isGroupChat: false,
          // logged in user's id and the user id we sent should be same in the 'users' array
          $and: [{ users: { $elemMatch: { $eq: req.user._id } } }, { users: { $elemMatch: { $eq: userId } } }],
        })
        .populate('users', '-password')
        .populate('latestMessage')

      chatExists = await this.#User.populate(chatExists, {
        path: 'latestMessage.sender',
        select: 'name pic email', // Fields we want to populate
      })

      if (chatExists.length > 0) {
        return this.handleSuccess(res, chatExists[0])
      } else {
        let newChatData = {
          chatName: 'sender',
          isGroupChat: false,
          users: [req.user._id, userId],
        }
        const createdChat = await this.#Chat.create(newChatData)
        const FullChat = await this.#Chat.findOne({ _id: createdChat._id }).populate('users', '-password')

        this.handleSuccess(res, FullChat)
      }
    } catch (error) {
      this.handleError(res, error)
    }
  }

  addToGroup = async (req, res) => {
    try {
      const { chatId, userId } = req.body

      const isAdmin = await this.#Chat.findOne({ groupAdmin: req.user._id }).exec()
      if (!isAdmin) {
        return this.handleError(res, {
          statusCode: 401,
          message: 'You are not authorized',
        })
      }

      const added = await this.#Chat
        .findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
        .populate('users', '-password')
        .populate('groupAdmin', '-password')

      if (!added) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: 'Chat Not Found',
        })
      } else {
        return res.status(200).json(added)
      }
    } catch (error) {
      this.handleError(res, error)
    }
  }

  createGroupChat = async (req, res) => {
    try {
      const { users, name } = req.body
      if (!users || !name) {
        return this.handleError(res, {
          statusCode: 400,
          message: 'Please fill in all required fields',
        })
      }

      const groupUsers = JSON.parse(users)

      if (groupUsers.length < 2) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'More than 2 users are required to form a group chat',
        })
      }

      // If current user not present in users array
      if (!groupUsers.includes(req.user._id.toString())) {
        groupUsers.push(req.user) // Add current user along with all the people
      }

      const groupChat = await this.#Chat.create({
        chatName: req.body.name,
        users: groupUsers,
        isGroupChat: true,
        groupAdmin: req.user, // As current user is creating the group
      })

      const fullGroupChat = await this.#Chat
        .findOne({ _id: groupChat._id })
        .populate('users', '-password')
        .populate('groupAdmin', '-password')

      this.handleSuccess(res, fullGroupChat)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  fetchUserChats = async (req, res) => {
    try {
      let results = await this.#Chat
        .find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        .populate('latestMessage')
        .sort({ updatedAt: -1 })

      results = await this.#User.populate(results, {
        path: 'latestMessage.sender',
        select: 'name pic email',
      })

      this.handleSuccess(res, results)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  removeFromGroup = async (req, res) => {
    try {
      const { chatId, userId } = req.body

      const isAdmin = await this.#Chat.findOne({ groupAdmin: req.user._id }).exec()
      if (!isAdmin) {
        return this.handleError(res, {
          statusCode: 401,
          message: 'You are not authorized',
        })
      }

      const removed = await this.#Chat
        .findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
        .populate('users', '-password')
        .populate('groupAdmin', '-password')

      if (!removed) {
        return this.handleError(res, {
          statusCode: 404,
          message: 'Chat Not Found',
        })
      }

      this.handleSuccess(res, removed)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  renameGroup = async (req, res) => {
    try {
      const { chatId, chatName } = req.body

      const isAdmin = await this.#Chat.findOne({ groupAdmin: req.user._id }).exec()
      if (!isAdmin) {
        return this.handleError(res, {
          statusCode: 401,
          message: 'You are not authorized',
        })
      }

      const updatedChat = await this.#Chat
        .findByIdAndUpdate(chatId, { chatName: chatName }, { new: true })
        .populate('users', '-password')
        .populate('groupAdmin', '-password')

      if (!updatedChat) {
        return this.handleError(res, {
          statusCode: 404,
          message: 'Chat Not Found',
        })
      }

      this.handleSuccess(res, updatedChat)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
