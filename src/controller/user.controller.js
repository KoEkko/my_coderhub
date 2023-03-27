const fs = require('fs')
const { NOT_AVATAR_EXISTS } = require('../config/error-constants')
const { UPLOAD_PATH } = require('../config/path')
const { queryAvaterByUserId } = require('../service/user.service')
const userService = require('../service/user.service')


class userController {
   async create(ctx, next) {
    // 1.获取用户传递过来信息
    const user = ctx.request.body

    // 2.将user信息存储到数据库中
    const result = await userService.create(user)

    ctx.body = {
      message: '创建用户成功',
      data: result
    }
  }

  async showAvatarImage(ctx, next) {
    const { userId } = ctx.params
    const result = await queryAvaterByUserId(userId)
    try {
      if (result.length) {
        const {filename, mimetype } = result
        ctx.type = mimetype
        ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
      } else {
        return ctx.app.emit('error', NOT_AVATAR_EXISTS ,ctx)
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new userController()