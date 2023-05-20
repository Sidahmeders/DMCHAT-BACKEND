const express = require('express')
const socketIO = require('socket.io')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')

const initListener = require('./src/wss')
const { connectToMongoDB } = require('./src/config')
const { notFound, errorHandler } = require('./src/middleware')
const {
  userRoutes,
  chatRoutes,
  messageRoutes,
  patientRoutes,
  calendarRoutes,
  appointmentRoutes,
} = require('./src/routes')

const app = express()
app.use(express.json())
dotenv.config({ path: path.join(__dirname, './.env') })
app.use(cors())

connectToMongoDB()

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/patient', patientRoutes)
app.use('/api/calendar', calendarRoutes)
app.use('/api/appointment', appointmentRoutes)
// --------------------------DEPLOYMENT------------------------------

// handle invalid routes
app.use(notFound)
app.use(errorHandler)

const server = app.listen(process.env.PORT, () => console.log(`Server started on PORT ${process.env.PORT}`))

const io = socketIO(server, {
  cors: { origin: '*' },
  pingTimeout: 60 * 1000,
  transports: ['websocket'],
  upgrade: false,
})

initListener(io)
