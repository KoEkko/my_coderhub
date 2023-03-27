const KoaRouter = require('@koa/router')
const { sign, test } = require('../controller/login.controller')
const {vertifyLogin, verifyAuth} = require('../middleware/login.middleware')

const loginRouter = new KoaRouter({ prefix: '/login'})

loginRouter.post('/', vertifyLogin,sign)
loginRouter.get('/test', verifyAuth, test)

module.exports = loginRouter