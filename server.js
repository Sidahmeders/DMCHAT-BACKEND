const express = require('express')
const socketIO = require('socket.io')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')

const initListener = require('./src/wss')
const { connectToMongoDB, setupSwagger } = require('./src/config')
const { userController } = require('./src/controllers')
const allRoutes = require('./src/routes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
dotenv.config({ path: path.join(__dirname, './.env') })

setupSwagger(app)
connectToMongoDB()

// API endpoints
app.use('/api', allRoutes)

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
