const multer = require('@koa/multer')

const uploadAvater = multer({
  dest:'./uploads'
})

const handleAvater = uploadAvater.single('avatar')

module.exports = {
  handleAvater
}

