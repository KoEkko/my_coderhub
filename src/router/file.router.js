const KoaRouter = require('@koa/router')
const { create } = require('../controller/file.controller.js')
const { handleAvater } = require('../middleware/file.middleware.js')
const { verifyAuth } = require ('../middleware/login.middleware.js')
const fileRouter = new KoaRouter({ prefix:'/file'})

fileRouter.post('/avatar',verifyAuth, handleAvater, create)

module.exports = fileRouter