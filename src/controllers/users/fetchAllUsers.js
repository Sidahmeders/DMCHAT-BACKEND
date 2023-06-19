module.exports = function makeFetchAllUsers({ User }) {
  return async function fetchAllUsers(req, res) {
    // Keyword contains search results
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } },
            { email: { $regex: req.query.search, $options: 'i' } },
          ],
        }
      : {}

    // Find and return users except current user
    const userExists = await User.find(keyword)
      .find({ _id: { $ne: req.user._id } })
      .exec()

    return res.status(200).json(userExists)
  }
}
