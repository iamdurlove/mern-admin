const adminMiddleware = async (req, res, next) => {
  try {
    const isAdmin = req.user.isAdmin
    if (!isAdmin) { return res.status(404).json({ message: 'Unauthorized access' }) }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = adminMiddleware
