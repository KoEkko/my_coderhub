
// 导入APP
const app = require('./app/index')
const { SERVER_PORT } = require('./config/server')
require('./utils/handle-error')

// 将APP启动起来
app.listen(SERVER_PORT, () => {
  console.log(`koa服务器启动成功`);
})