const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const expressSessions = require('express-session')
const flash = require('connect-flash')
const db = require('./config/mongooseConnection')
const router = express.Router()
const eventRoute = require('./routes/eventsRouter')
const userRouter = require('./routes/userRouter')

require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(flash())
// app.use(expressSessions({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.EXPRESS_SESSION_SECRET
// }))

app.use('/events',eventRoute)
app.use('/users',userRouter)
app.listen(3000)