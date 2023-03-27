
const { queryLabelByName, create } = require("../service/label.service")

const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body
  const newLabels = []
  for (const name of labels) {
    const result = await queryLabelByName(name)
    const labelObj = { name } // 将数据格式转化为 { name: 'music' , label_id : '2' }  方便对关系表操作
    if (result) { // 存在这个label,就保存
      labelObj.id = result.id
    } else { // 不存在这个label 就新增
      const insertResult = await create(name)
      labelObj.id = insertResult.insertId
    }
    newLabels.push(labelObj)
  }
  ctx.labels = newLabels
  await next()
}

module.exports = {
  verifyLabelExists
}