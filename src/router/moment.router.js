const KoaRouter = require('@koa/router')
const { list, detail , update ,remove, addLabels} = require('../controller/moment.controller')
const momentController = require('../controller/moment.controller')
const { verifyLabelExists } = require('../middleware/label.middleware')
const { verifyAuth } = require('../middleware/login.middleware')
const { verifyPermission } = require('../middleware/permission.middleware')

const momentRouter = new KoaRouter({ prefix: '/moment'})

// 增
momentRouter.post('/',verifyAuth, momentController.create)
// 查
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)

// 改
momentRouter.patch('/:momentId', verifyAuth, verifyPermission ,update)

// 删
momentRouter.delete('/:momentId', verifyAuth, verifyPermission ,remove)

// 动态添加标签
/**
 * 接口URL ： 给哪条动态添加标签，需要附加上momentId, 加上labels 区分之前的接口
 * 
 * 中间件的逻辑
 * 1. 需要登录
 * 2. 需要验证是否有添加label的权限，就是这个动态是不是本人创建的
 * 3. 添加的标签是否是新的或者是已经存在的
 * 3.1 如果存在，直接从数据库中获取
 * 3.2 如果不存在，就新增该标签
 * 4. 维护 moment_label 的关系表
 * 
 */
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)
module.exports = momentRouter

