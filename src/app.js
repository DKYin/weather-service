const express = require('express')
const forecastRouter = require('./routers/forecast')
const geocodeRouter = require('./routers/geocode')

const app = express()

app.use(express.json()) // automatically parses json to object in req.body
app.use(forecastRouter)
app.use(geocodeRouter)

module.exports = app