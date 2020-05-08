/**
 * @description user services
 * @author
 */

const User = require('../db/models/user')
const { formatUserPicture } = require('./_format')

/**
 * @description 获取用户信息
 * @param {string} userName 用户名
 * @param {string} userName 用户密码
 */
async function getUserInfo(userName, password) {
  const whereOpt = {
    userName,
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    where: whereOpt,
  })
  console.log('查询用户信息', result)
  if (result == null) {
    return result
  }
  const formatRes = formatUserPicture(result.dataValues)
  return formatRes
}

/**
 * 创建用户
 * @param {Object} param0 创建用户的参数 {userName, password, nickName}
 */
async function createUser({ userName, password, nickName }) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName || userName,
  })
  console.log('创建用户', result)
  const data = result.dataValues
  return data
}

/**
 * 更新用户信息
 * @param {Object} param0 更新的数据 {newPassword, newNickName, newPicture}
 * @param {Object} param1 用户名和密码 {userName, password}
 */
async function updateUser(
  { newPassword, newNickName, newPicture },
  { userName, password }
) {
  //拼接修改内容
  const updateData = {}
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newNickName) {
    updateData.nickName = newNickName
  }
  if (newPicture) {
    updateData.picture = newPicture
  }
  // 拼接查询条件
  const whereData = {
    userName,
  }
  if (password) {
    whereData.password = password
  }

  const result = await User.update(updateData, { where: whereData })
  return result.length > 0
}

async function deleteUser (userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    // result 删除的行数
    return result > 0
}
module.exports = {
  getUserInfo,
  createUser,
  updateUser,
  deleteUser
}
