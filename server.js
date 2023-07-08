const express = require('express')
const socketIO = require('socket.io')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')

const initListener = require('./src/wss')
const { baseURLs, connectToMongoDB, setupSwagger } = require('./src/config')
const {
  userRoutes,
  chatRoutes,
  messageRoutes,
  patientRoutes,
  calendarRoutes,
  appointmentRoutes,
  paymentRoutes,
  statisticsRoutes,
} = require('./src/routes')
const { userController } = require('./src/controllers')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
dotenv.config({ path: path.join(__dirname, './.env') })

setupSwagger(app)
connectToMongoDB()

// API endpoints
app.use(baseURLs.USERS, userRoutes)
app.use(baseURLs.CHAT, chatRoutes)
app.use(baseURLs.PATIENTS, patientRoutes)
app.use(baseURLs.MESSAGES, messageRoutes)
app.use(baseURLs.CALENDAR, calendarRoutes)
app.use(baseURLs.APPOINTMENTS, appointmentRoutes)
app.use(baseURLs.PAYMENTS, paymentRoutes)
app.use(baseURLs.STATISTICS, statisticsRoutes)

// Static pages
app.use('/reset-password-form/:token', userController.sendResetPasswordForm)
app.use('/reset-password-success', (req, res) => {
  res.sendFile(`${__dirname}/public/reset-password-success.html`)
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT ${process.env.PORT}`)
})

const io = socketIO(server, {
  cors: { origin: '*' },
  pingTimeout: 60 * 1000,
})

initListener(io)
