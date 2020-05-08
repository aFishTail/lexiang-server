/**
 * @description user controller
 * @author wh
 */

const { getUserInfo, createUser, updateUser, deleteUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  loginFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo,
  deleteUserFailInfo
} = require('../model/ErrorInfos')
const doCrypto = require('../utils/crypto')

/**
 * @description 判断用户名是否存在
 * @param {string} userName
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // { errno: 0, data: {....} }
    return new SuccessModel(userInfo)
  } else {
    // { errno: 10003, message: '用户名未存在' }
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}
/**
 * @description 注册用户
 * @param {Object}  param0 注册用户参数 {userName, password, nickName}
 */
async function register({ userName, password, nickName }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo)
  }
  try {
    const userInfo = await createUser({
      userName,
      password: doCrypto(password),
      nickName,
    })
    return new SuccessModel(userInfo)
  } catch (ex) {
    console.log(ex)
  }
}
/**
 * @description 用户登录
 * @param {Object}  param0 ctx
 * @param {Object}  param1 登录参数 {userName, password}
 */
async function login(ctx, { userName, password }) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (userInfo) {
    ctx.session.userInfo = userInfo
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(loginFailInfo)
  }
}
/**
 * @description 修改用户信息
 * @param {Object}  param0 修改参数 {userName, password, newPassword, nickName, picture}
 */
async function changeInfo(ctx, { nickName, picture }) {
  const { userName } = ctx.session.userInfo

  if (!nickName) {
    nickName = userName
  }

  const result = await updateUser(
    {
      newNickName: nickName,
      newPicture: picture,
    },
    { userName }
  )
  if (result) {
    // 执行成功
    Object.assign(ctx.session.userInfo, {
      nickName,
      picture,
    })
    // 返回
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改密码
 * @param {string} userName 用户名
 * @param {string} password 当前密码
 * @param {string} newPassword 新密码
 */
async function changePassword(userName, password, newPassword) {
  const result = await updateUser(
    {
      newPassword: doCrypto(newPassword),
    },
    {
      userName,
      password: doCrypto(password),
    }
  )
  if (result) {
    // 成功
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param {Object} ctx ctx
 */
async function logout(ctx) {
  ctx.session.userInfo = null
  return new SuccessModel()
}

/**
 * 删除用户
 * @param {Object} ctx ctx
 */
/**
 * 删除当前用户 
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
  const result = await deleteUser(userName)
  if (result) {
    // 成功
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(deleteUserFailInfo)
}


module.exports = {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  logout,
  deleteCurUser
}
