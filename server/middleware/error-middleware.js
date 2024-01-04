const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error || Backend Error'
  const extraDetails =
		err.extraDetails || 'Internal Server Error || Backend Error'

  return res.status(status).json({ message, extraDetails })
}

module.exports = errorMiddleware
