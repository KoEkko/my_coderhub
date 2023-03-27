const KoaRouter = require('@koa/router')
const { create } = require('../controller/label.controller')
const { verifyAuth } = require('../middleware/login.middleware')


const labelRouter = new KoaRouter({ prefix:'/label'})

labelRouter.post('/', verifyAuth, create)

module.exports = labelRouter