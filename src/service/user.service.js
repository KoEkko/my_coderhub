const connection = require('../app/database')

class userService {
  async create(user) {
    // 1. 获取用户
    const { name, password } = user

    // 2. 拼接statement
    const statement = 'INSERT INTO `user` (name, password) VALUES (?, ?);'
    const [result] = await connection.execute(statement, [name, password])
    return result
  }

  async findUserByName(name) {
    const statement =  'SELECT * FROM `user` WHERE name = ?;'
    const [values] = await connection.execute(statement,[name])
    return values
  }

  async queryAvaterByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    const [result] = await connection.execute(statement,[userId])
    return result
  }

  async updateUserAvatar(avatarUrl,id) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?`
    const [result] = await connection.execute(statement,[avatarUrl,id])
    return result
  }
}

module.exports = new userService()