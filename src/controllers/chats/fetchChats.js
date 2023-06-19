module.exports = function createFetchChats({ Chat, User }) {
  return async function fetchChats(req, res) {
    try {
      let results = await Chat.find({
        users: { $elemMatch: { $eq: req.user._id } },
      })
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        .populate('latestMessage')
        .sort({ updatedAt: -1 })
        .exec()

      results = await User.populate(results, {
        path: 'latestMessage.sender',
        select: 'name pic email',
      })

      return res.status(200).send(results)
    } catch (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.message,
      })
    }
  }
}
