const BaseController = require('./BaseController')

module.exports = class UserController extends BaseController {
  #User
  #generateToken
  #verifyToken
  #verifyPassword
  #generatePasswordHash
  #sendEmails

  #baseURL = 'http://localhost:5000' || 'https://dnmchat-backend.onrender.com'

  constructor({ User, generateToken, verifyToken, verifyPassword, generatePasswordHash, sendEmails }) {
    super()
    this.#User = User
    this.#generateToken = generateToken
    this.#verifyToken = verifyToken
    this.#verifyPassword = verifyPassword
    this.#generatePasswordHash = generatePasswordHash
    this.#sendEmails = sendEmails
  }

  fetchAllUsers = async (req, res) => {
    try {
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
      const userExists = await this.#User
        .find(keyword)
        .find({ _id: { $ne: req.user._id } })
        .exec()

      this.handleSuccess(res, userExists)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  authenticateUser = async (req, res) => {
    try {
      const { email, password } = req.body

      // Check if any of them is undefined
      if (!email || !password) {
        return this.handleError(res, {
          statusCode: 400,
          message: 'Please enter all the required fields',
        })
      }

      const userExists = await this.#User.findOne({ email })
      if (!userExists) {
        return this.handleError(res, {
          statusCode: 400,
          message: 'Email does not exist!',
        })
      }

      const isPasswordMatch = await this.#verifyPassword(password, userExists.password)
      if (!isPasswordMatch) {
        return this.handleError(res, {
          statusCode: 400,
          message: 'Password does not match!',
        })
      }

      this.handleSuccess(res, {
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        role: userExists.role,
        pic: userExists.pic,
        token: this.#generateToken({ id: userExists._id, email: userExists.email }),
      })
    } catch (error) {
      this.handleError(res, error)
    }
  }

  registerUser = async (req, res) => {
    try {
      const { name, email, password, pic } = req.body

      if (!name || !email || !password) {
        return this.handleSuccess(res, {
          statusCode: 400,
          message: 'Please enter all the required fields',
        })
      }

      const userExists = await this.#User.findOne({ email })

      if (userExists) {
        return this.handleError(res, {
          statusCode: 400,
          message: 'User already exists',
        })
      }

      const passwordHash = await this.#generatePasswordHash(password)
      const userCreated = await this.#User.create({ name, email, pic, password: passwordHash })

      if (!userCreated) {
        return this.handleError(res, { statusCode: 400, message: 'Failed to create the User' })
      }

      this.handleSuccess(
        res,
        {
          _id: userCreated._id,
          name: userCreated.name,
          email: userCreated.email,
          pic: userCreated.pic,
          token: this.#generateToken({ id: userCreated._id, email: userCreated.email }),
        },
        201,
      )
    } catch (error) {
      this.handleError(res, error)
    }
  }

  forgetPassword = async (req, res) => {
    try {
      const { email } = req.body

      const userExists = await this.#User.findOne({ email })
      if (!userExists) {
        return this.handleError(res, {
          statusCode: 400,
          message: 'Email does not exist!',
        })
      }

      const token = await this.#generateToken({ id: userExists._id, email: userExists.email, expiresIn: '10m' })

      this.#sendEmails({
        recipients: email,
        subject: 'account password reset',
        directUrl: `${this.#baseURL}/reset-password-form/${token}`,
      })

      this.handleSuccess(res, { message: 'please check your email' })
    } catch (error) {
      this.handleError(req, error)
    }
  }

  sendResetPasswordForm = async (req, res) => {
    try {
      this.#verifyToken(req.params.token)
      res.sendFile('/public/reset-password-form.html', { root: '.' })
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.send('Token Expired!')
      }
      if (error.name === 'JsonWebTokenError') {
        return res.send('No Token was found or Invalid Signature!')
      }
      res.send(error.message)
    }
  }

  resetPassword = async (req, res) => {
    try {
      const { token } = req.params
      const { password1, password2 } = req.body

      if (!password1 || !password2) {
        return res.send('Please fill in both passwords')
      }
      if (password1 !== password2) {
        return res.send('Passwords did not match!')
      }

      const { id: userId } = this.#verifyToken(token)
      const passwordHash = await this.#generatePasswordHash(password1)
      await this.#User.findByIdAndUpdate(userId, { password: passwordHash })

      this.handleSuccess(res)
    } catch (error) {
      res.send(error.message)
    }
  }
}
