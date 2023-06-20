const express = require('express')
const socketIO = require('socket.io')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')

const initListener = require('./src/wss')
const { connectToMongoDB, setupSwagger } = require('./src/config')
const { errorHandler } = require('./src/middleware')
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
app.use(cors())
dotenv.config({ path: path.join(__dirname, './.env') })
app.use(errorHandler)

setupSwagger(app)
connectToMongoDB()

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/calendar', calendarRoutes)
app.use('/api/appointments', appointmentRoutes)

const server = app.listen(process.env.PORT, () => console.log(`Server started on PORT ${process.env.PORT}`))

const io = socketIO(server, {
  cors: { origin: '*' },
  pingTimeout: 60 * 1000,
})

initListener(io)
