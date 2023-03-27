const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
} = require("../config/error-constants");

const userService = require("../service/user.service");
const md5pwd = require("../utils/md5-pwd");

async function verifyUser(ctx, next) {
  const user = ctx.request.body;

  const { name, password } = user;

  // 验证客户端传递过来的user是否可以保存到数据库中
  // 验证用户名或者密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  // 判断name是否在数据库中已经存在
  const users = await userService.findUserByName(name);
  if (users.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }

  // 执行下一个中间件
  await next();
}

async function md5PassWord(ctx, next) {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5pwd(password);
  await next();
}
module.exports = { verifyUser, md5PassWord };
