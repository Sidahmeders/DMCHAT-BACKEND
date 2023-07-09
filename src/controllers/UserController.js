const BaseController = require('./BaseController')

module.exports = class UserController extends BaseController {
  #User
  #generateToken
  #verifyToken
  #verifyPassword
  #generatePasswordHash
  #sendEmails
  #inMemoryTokens = {}
  #baseURL = 'https://dnmchat-backend.onrender.com'

  constructor({ User, generateToken, verifyToken, verifyPassword, generatePasswordHash, sendEmails }) {
    super()
    this.#User = User
    this.#generateToken = generateToken
    this.#verifyToken = verifyToken
    this.#verifyPassword = verifyPassword
    this.#generatePasswordHash = generatePasswordHash
    this.#sendEmails = sendEmails
  }

  #randomNumbers = (n) => {
    const randomNumbersArray = Array.from({ length: n }, () => Math.floor(Math.random() * 9))
    return randomNumbersArray.join('')
  }

  #manageInMemoryTokens = {
    getTimedToken: (key) => {
      const timedToken = this.#inMemoryTokens[key]
      delete this.#inMemoryTokens[key]
      return timedToken || null
    },
    setTimedToken: (key, value, duration) => {
      this.#inMemoryTokens[key] = value
      setTimeout(() => {
        delete this.#inMemoryTokens[key]
      }, duration)
    },
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

      const foundUsers = await this.#User
        .find(keyword)
        .find({ _id: { $ne: req.user._id } })
        .select('-password')

      this.handleSuccess(res, foundUsers)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return this.handleError(res, {
          statusCode: 400,
          message: 'Please enter all the required fields',
        })
      }

      const foundUser = await this.#User.findOne({ email })
      if (!foundUser) {
        return this.handleError(res, {
          statusCode: 400,
          message: 'Email does not exist!',
        })
      }

      const isPasswordMatch = await this.#verifyPassword(password, foundUser.password)
      if (!isPasswordMatch) {
        return this.handleError(res, {
          statusCode: 400,
          message: 'Password does not match!',
        })
      }

      const tokenExpiration = 1000 * 60 * 5 // 5 minutes
      const sixRandomNumbers = this.#randomNumbers(6)
      const token = this.#generateToken({ expiresIn: '5m' })

      this.#manageInMemoryTokens.setTimedToken(
        token,
        {
          otp: sixRandomNumbers,
          email: email,
        },
        tokenExpiration,
      )

      this.#sendEmails({
        recipients: email,
        subject: 'Login confirmation',
        secretKey: sixRandomNumbers,
      })

      this.handleSuccess(res, { token, message: 'please check your email' })
    } catch (error) {
      this.handleError(res, error)
    }
  }

  registerUser = async (req, res) => {
    try {
      const { name, email, password, pic } = req.body

      if (!name || !email || !password) {
        return this.handleError(res, {
          statusCode: 400,
          message: 'Please enter all the required fields',
        })
      }

      const foundUser = await this.#User.findOne({ email })

      if (foundUser) {
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

      this.handleSuccess(res, { message: 'account created successfully' })
    } catch (error) {
      this.handleError(res, error)
    }
  }

  forgetPassword = async (req, res) => {
    try {
      const { email } = req.body

      const foundUser = await this.#User.findOne({ email })
      if (!foundUser) {
        return this.handleError(res, {
          statusCode: 400,
          message: 'Email does not exist!',
        })
      }

      const token = await this.#generateToken({ id: foundUser._id, email: foundUser.email, expiresIn: '10m' })

      this.#sendEmails({
        recipients: email,
        subject: 'Account password reset',
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

  confirmLogin = async (req, res) => {
    try {
      const { token, otpCode } = req.body

      const timedToken = this.#manageInMemoryTokens.getTimedToken(token)
      if (!timedToken) {
        return this.handleError(res, { message: 'Token not found or timed out' })
      }

      if (otpCode !== timedToken.otp) {
        return this.handleError(res, {
          statusCode: 400,
          message: 'OTP did not match!',
        })
      }

      const foundUser = await this.#User.findOne({ email: timedToken.email })
      if (!foundUser) {
        return this.handleError(res, { message: 'User was not found!' })
      }

      const userData = {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        pic: foundUser.pic,
        token: this.#generateToken({ id: foundUser._id, email: foundUser.email }),
      }

      this.handleSuccess(res, userData)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  updateUser = async (req, res) => {
    try {
      const { id, email } = req.query
      if (!id && !email) {
        return this.handleError(res, { message: 'No User id or email was found in your query!' })
      }

      const updatedUser = await this.#User
        .findOneAndUpdate({ _id: id, email }, req.body, { new: true })
        .select('-password')

      this.handleSuccess(res, updatedUser)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
