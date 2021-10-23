require('@configs/db.config')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('@routes/api/contacts.routes')
const usersRouter = require('@routes/api/users.routes')
const { jwtValidator } = require('@middlewares')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

// app.use(() => console.log('catched request'))
app.use('/api/users', usersRouter)
app.use(jwtValidator)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
