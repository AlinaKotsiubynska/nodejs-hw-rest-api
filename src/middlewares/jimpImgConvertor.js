const Jimp = require('jimp')

const jimpImgConvertor = async (req, res, next) => {
  try {
    const { path: tempPath } = req.file

    const image = await Jimp.read(tempPath)
    image.cover(250, 250)
    await image.writeAsync(tempPath)

    next()
  } catch (error) {
    console.log('jimp err:', error)
  }
}

module.exports = jimpImgConvertor
