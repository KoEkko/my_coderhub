const jwt = require('jsonwebtoken')
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZATION
} = require("../config/error-constants");
const { PUBLIC_KEY } = require("../config/screct");
const { findUserByName } = require("../service/user.service");
const md5pwd = require("../utils/md5-pwd");

async function vertifyLogin(ctx, next) {
  const { name, password } = ctx.request.body;

  // 用户名或者密码为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }

  // 查询该用户是否在数据库中存在
  const users = await findUserByName(name);
  const user = users[0];
  if (!user) {
    return ctx.app.emit("error", USER_IS_NOT_EXISTS, ctx);
  }

  // 查询数据库中的密码和输入的密码是否一致
  if (user.password !== md5pwd(password)) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRECT, ctx);
  }

  ctx.user = user;

  await next();
}
async function verifyAuth(ctx, next) {
  // 获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
  const token = authorization.replace("Bearer ", "");
  // 验证token是否有效
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (error) {
    console.log(error);
    return ctx.app.emit("error", UNAUTHORIZATION, ctx);
  }
}
module.exports = { vertifyLogin, verifyAuth };
