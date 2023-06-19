module.exports = function makeCreateCreateGroupChat({ Chat }) {
  return async function createGroupChat(req, res) {
    // If any of them is missing
    if (!req.body.users || !req.body.name) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Veuillez remplir tous les champs obligatoires',
      })
    }

    let users = JSON.parse(req.body.users)

    if (users.length < 2) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'More than 2 users are required to form a group chat',
      })
    }

    // If current user not present in users array
    if (!users.includes(req.user._id.toString())) {
      users.push(req.user) // Add current user along with all the people
    }

    try {
      const groupChat = await Chat.create({
        chatName: req.body.name,
        users,
        isGroupChat: true,
        groupAdmin: req.user, // As current user is creating the group
      })

      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate('users', '-password')
        .populate('groupAdmin', '-password')

      return res.status(200).json(fullGroupChat)
    } catch (error) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.message,
      })
    }
  }
}
