const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

logger.info('connecting to mongodb ...')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to mongodb', { useNewUrlParser: true, useUnifiedTopology: true })
  })
  .catch(error => logger.error('error connection to mongodb', error))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndPoints)
app.use(middleware.errorHandler)

module.exports = app
