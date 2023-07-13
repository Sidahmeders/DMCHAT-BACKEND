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

  fetchUsers = async (req, res) => {
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
          message: 'Veuillez saisir tous les champs obligatoires',
        })
      }

      const foundUser = await this.#User.findOne({ email })
      if (!foundUser) {
        return this.handleError(res, {
          statusCode: 400,
          message: "L'e-mail n'existe pas!",
        })
      }

      const isPasswordMatch = await this.#verifyPassword(password, foundUser.password)
      if (!isPasswordMatch) {
        return this.handleError(res, {
          statusCode: 400,
          message: 'Le mot de passe ne correspond pas!',
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
        subject: 'Confirmation de connexion',
        secretKey: sixRandomNumbers,
      })

      this.handleSuccess(res, { token, message: "pouvez-vous vérifier votre e-mail s'il vous plaît" })
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
          message: '',
        })
      }

      const foundUser = await this.#User.findOne({ email })

      if (foundUser) {
        return this.handleError(res, {
          statusCode: 400,
          message: "L'utilisateur existe déjà",
        })
      }

      const passwordHash = await this.#generatePasswordHash(password)
      const userCreated = await this.#User.create({ name, email, pic, password: passwordHash })

      if (!userCreated) {
        return this.handleError(res, { statusCode: 400, message: "Échec de créer l'utilisateur" })
      }

      this.handleSuccess(res, { message: 'compte créé avec succès' })
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
          message: "L'e-mail n'existe pas!",
        })
      }

      const token = await this.#generateToken({ id: foundUser._id, email: foundUser.email, expiresIn: '10m' })

      this.#sendEmails({
        recipients: email,
        subject: 'Réinitialisation du mot de passe du compte',
        directUrl: `${this.#baseURL}/reset-password-form/${token}`,
      })

      this.handleSuccess(res, { message: "pouvez-vous vérifier votre e-mail s'il vous plaît" })
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
        return res.send('Veuillez renseigner les deux mots de passe')
      }
      if (password1 !== password2) {
        return res.send('Les mots de passe ne correspondent pas!')
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
        return this.handleError(res, { message: 'Token introuvable ou expiré' })
      }

      if (otpCode !== timedToken.otp) {
        return this.handleError(res, {
          statusCode: 400,
          message: 'OTP did not match!',
        })
      }

      const foundUser = await this.#User.findOne({ email: timedToken.email })
      if (!foundUser) {
        return this.handleError(res, { message: "L'utilisateur n'a pas été trouvé" })
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
      const { userId } = req.params
      const updatedUser = await this.#User.findByIdAndUpdate(userId, req.body, { new: true }).select('-password')
      this.handleSuccess(res, updatedUser)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  deleteUser = async (req, res) => {
    try {
      const { userId } = req.params
      await this.#User.findByIdAndDelete(userId)
      this.handleSuccess(res)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}
