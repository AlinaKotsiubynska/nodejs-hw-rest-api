const Jimp = require('jimp')
const fs = require('fs/promises')
const path = require('path')

const jimpImgConvertor = async (req, res, next) => {
  try {
    const { path: tempPath } = req.file

    const image = await Jimp.read(tempPath)
    image.resize(Jimp.AUTO, 250)
    await image.writeAsync(tempPath)

    next()
  } catch (error) {
    console.log('jimp err:', error)
  }
}

module.exports = jimpImgConvertor
