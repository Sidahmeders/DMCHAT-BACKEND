module.exports = function createRegisterUser({ User, generateHashedPassword, generateToken }) {
  return async function registerUser(req, res) {
    const { name, email, password, pic } = req.body

    // Check if any of them is undefined
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Please enter all the fields',
      })
    }

    // Check if user already exists in our DB
    const userExists = await User.findOne({ email }).exec()

    if (userExists) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'User already exists',
      })
    }

    // Register and store the new user
    const userCreated = await User.create(
      // If there is no picture present, remove 'pic'
      pic === undefined || pic.length === 0
        ? {
            name,
            email,
            password: await generateHashedPassword(password),
          }
        : {
            name,
            email,
            password: await generateHashedPassword(password),
            pic,
          },
    )

    if (userCreated) {
      return res.status(201).json({
        success: true,
        statusCode: 201,
        _id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
        pic: userCreated.pic,
        token: generateToken(userCreated._id, userCreated.email),
        message: 'User Created Successfully',
      })
    } else {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Failed to create the User',
      })
    }
  }
}
