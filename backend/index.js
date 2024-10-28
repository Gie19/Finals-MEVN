const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const createError = require('http-errors');

//Connect to mongoDB
mongoose
.connect('mongodb://127.0.0.1:27017/MyDb')
.then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
.catch((err) => {
    console.error('Error connecting to mongo', err.reason)
})
const eventAPI = require('../backend/routes/event.routes')
const portfolioAPI = require('../backend/routes/portfolio.routes')
const profileAPI = require('../backend/routes/profile.routes')

const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)

app.use(cors())
// API
app.use('/api', eventAPI)
app.use('/api', portfolioAPI)
app.use('/api', profileAPI)

// Create port
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404
app.use((req, res, next) => {
    next(createError(404))
})


// error handler
app.use(function (err, req, res, next) {
    console.error(err.message)
    if (!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})