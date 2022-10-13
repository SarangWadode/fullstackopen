const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndPoints = (req,res) => {
  res.status(404).send({ error: 'unknown endpoints' })
}

const errorHandler = (req, res, error, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndPoints,
  errorHandler
}
