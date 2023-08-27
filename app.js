const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const http = require('http')

const app = express()

const listRoutes = require('./routes/listRoutes')

dotenv.config()
const mongoDB = require('./config/db_connection')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }))
app.use('/list', listRoutes)

app.get('/', (req, res) => res.send('Todo Backend!!!'))

const PORT = process.env.PORT || 4000
const server = http.createServer(app)

server.listen(PORT, () => console.log('Server runnning!!'))