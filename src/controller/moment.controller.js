const { queryList, queryById, update, remove, hasLabel, addLabel } = require("../service/moment.service");
const momentService = require("../service/moment.service")

class MomentController {
  async create(ctx, next) {
    const { content } = ctx.request.body
    console.log(content);
    const { id } = ctx.user
    const result = await momentService.create(content, id)

    ctx.body = {
      code: 0,
      message:'创建动态成功',
      data:result
    }
  }
  async list(ctx, next) {
    const { offset, size } = ctx.query
    const result = await queryList(offset, size)
    ctx.body = {
      code: 0,
      data: result
    } 
  }

  async detail(ctx, next) {
    const { momentId } = ctx.params
    const result = await queryById(momentId)
    ctx.body = {
      code: 0,
      data: result
    }
  }

  async update(ctx, next) {
    const { momentId } = ctx.params
    // 修改的内容
    const { content } = ctx.request.body
    const result = await update(content, momentId)
    ctx.body = {
      code:0,
      message:'修改成功',
      data:result
    }
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params
    console.log(momentId);
    const result = await remove(momentId)
    ctx.body = {
      code:0,
      message: '删除成功~',
      data: result
    }
  }

  async addLabels(ctx, next) {
    console.log(`addlabels-----------`);
    try {
      const { labels } = ctx
      const { momentId } = ctx.params
      console.log(labels, momentId);
      // 将labels 的数据添加到 moment_label 表中
      for (const label of labels ) {
        // 判断该label是否已经在表中存在了
        const isExist = await hasLabel(momentId, label.id)
        if (!isExist) { // 不存在的就添加
          const result = await addLabel(momentId, label.id)
        }
      }
      ctx.body = {
        code: 0,
        message:'动态添加标签成功~',
      }
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: -3001,
        message: '动态添加标签失败，请检测数据问题'
      }
    }
  }
}

module.exports = new MomentController()