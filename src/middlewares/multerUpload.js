const multer = require('multer')
const { uploadConfig } = require('@configs/multer.config')

const multerUpload = multer({
  storage: uploadConfig,
  limits: {
    fieldSize: 2048
  }
})

module.exports = multerUpload