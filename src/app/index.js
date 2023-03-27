const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const registerRouter = require('../router')
const momentRouter = require('../router/moment.router')

const app = new Koa()

app.use(bodyParser())
app.use(momentRouter.routes())
app.use(momentRouter.allowedMethods())

registerRouter(app)

module.exports = app