const { OPERATION_IS_NOT_ALLOWED } = require("../config/error-constants")
const {  checkPermission } = require("../service/permission.service")

async function verifyPermission(ctx, next) {
  // 获取登录用户的id
  const { id } = ctx.user
  // 获取资源的名称
  // params : { momentId: 4 }
  const keyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyName]
  const resourceName = keyName.replace('Id','')
  // 查询用户的id 是否有修改该评论的权限
  const isPermission = await checkPermission(resourceName, resourceId ,id)
  if (!isPermission) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }
  await next()
}

module.exports = {
  verifyPermission
}