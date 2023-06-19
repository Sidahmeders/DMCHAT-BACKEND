module.exports = function makeAuthenticateUser({ User, verifyPassword, generateToken }) {
  return async function authenticateUser(req, res) {
    const { email, password } = req.body

    // Check if any of them is undefined
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Please enter all the fields',
      })
    }

    // Check if user already exists in our DB
    const userExists = await User.findOne({ email }).exec()

    // If user exists and password is verified
    if (userExists && (await verifyPassword(password, userExists.password))) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        pic: userExists.pic,
        token: generateToken(userExists._id, userExists.email),
        message: 'Authenticated Successfully',
      })
    } else {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid Email or Password',
      })
    }
  }
}
