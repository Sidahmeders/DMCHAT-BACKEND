module.exports = function createAccessChat({ Chat, User }) {
  return async function accessChat(req, res) {
    const { userId } = req.body

    // If chat with 'userId' not present in request
    if (!userId) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'UserId param not sent with request',
      })
    }

    let chatExists = await Chat.find({
      isGroupChat: false, // 'isGroupChat' will be false as it is one-to-one chat
      // logged in user's id and the user id we sent should be same in the 'users' array
      $and: [{ users: { $elemMatch: { $eq: req.user._id } } }, { users: { $elemMatch: { $eq: userId } } }],
    })
      .populate('users', '-password') // Return 'users' without 'password'
      .populate('latestMessage') // Return 'latestMessage'

    chatExists = await User.populate(chatExists, {
      path: 'latestMessage.sender',
      select: 'name pic email', // Fields we want to populate
    })

    // Check if chat exists, else create a new chat
    if (chatExists.length > 0) {
      return res.status(200).send(chatExists[0])
    } else {
      let newChatData = {
        chatName: 'sender',
        isGroupChat: false,
        users: [req.user._id, userId],
      }

      try {
        const createdChat = await Chat.create(newChatData)
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate('users', '-password')
        res.status(200).json(FullChat)
      } catch (error) {
        res.status(400).json({
          success: false,
          statusCode: 400,
          message: error.message,
        })
      }
    }
  }
}
