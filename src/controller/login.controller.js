const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require("../config/screct");

class LoginController {
  sign(ctx, next) {
    // 颁发令牌

    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name } , PRIVATE_KEY, {
      expiresIn: 24 *60 * 60,
      algorithm: 'RS256'
    })
    // ctx.body = name
    ctx.body = { code: 0, data: { id, name , token } };
  }

  test(ctx, next) {
    ctx.body = '有效的token'
  }
}

module.exports = new LoginController();
