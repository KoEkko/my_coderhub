const { create } = require("../service/file.service")
const { SERVER_HOST, SERVER_PORT } = require('../config/server')
const { updateUserAvatar } = require("../service/user.service")
class fileController {
  async create(ctx, next) {
    const { filename,mimetype, size } = ctx.request.file
    const { id } = ctx.user
    const result = await create(filename,mimetype, size ,id)
    // 将头像的地址信息，保存到user表中
    
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
    const result2 = await updateUserAvatar(avatarUrl,id)
    ctx.body = {
      code:0,
      message:`上传成功`,
      data: avatarUrl
    }
  }
}

module.exports = new fileController()