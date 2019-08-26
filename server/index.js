const express = require('express')
const path = require('path')
const volleyball = require('volleyball')

const app = express()

app.use(volleyball.custom({ debug: true }))

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./api')) // include our routes!

// static middleware
app.use(express.static(path.join(__dirname, '../public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}) // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app
