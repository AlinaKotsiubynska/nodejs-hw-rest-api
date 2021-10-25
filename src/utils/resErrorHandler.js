const resErrorHandler = (res, error) => {
  if (!error.status) {
    res.status(500).json({ status: 'error', code: error?.name, message: error?.message })
  } else {
    res.status(error.status).json({ status: 'error', code: error.status, message: error?.message })
  }
}

module.exports = { resErrorHandler }
