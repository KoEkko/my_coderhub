const app = require('../app/index')
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS, USER_IS_NOT_EXISTS, PASSWORD_IS_INCORRECT, UNAUTHORIZATION, OPERATION_IS_NOT_ALLOWED, NOT_AVATAR_EXISTS } = require('../config/error-constants')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''

  switch(error) {
    case NAME_OR_PASSWORD_IS_REQUIRED :
      code = -1001,
      message = '用户名或者密码不能为空~'
      break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002,
      message = '该账号已经被注册,请重新输入用户名~'
      break
    case USER_IS_NOT_EXISTS:
      code = -1003,
      message = '该用户不存在,请重新输入'
      break
    case PASSWORD_IS_INCORRECT:
      code = -1004,
      message = '输入的密码不正确,请重新输入'
      break
    case UNAUTHORIZATION:
      code = -1005
      message = '未授权或者已过期的Token'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = -2001
      message = '没有操作该资源的权限'
      break
    case NOT_AVATAR_EXISTS:
      code = -1006
      message = '该用户没有头像，请上传头像'
      break
  }
  ctx.body = {
    code,
    message
  }
})