const connection = require("../app/database")

class Permission {
  async checkPermission(resourceName, resourseId, userId) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?`
    const [result] = await connection.execute(statement, [resourseId, userId])
    return !!result.length
  }
}

module.exports = new Permission()