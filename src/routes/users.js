const router = require('koa-router')()

const {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  logout,
  deleteCurUser
} = require('../controller/user')
const userValitate = require('../validator/user')
const { isTest } = require('../utils/env')
const { genValidator } = require('../middlewares/valitator')
const { loginCheck } = require('../middlewares/loginCheck')

router.prefix('/users')

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 注册
router.post('/register', genValidator(userValitate), async (ctx, next) => {
  console.log('调了登录接口', ctx)
  const { userName, password, nickName } = ctx.request.body
  const result = await register({ userName, password, nickName })
  ctx.body = result
})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  const result = await login(ctx, { userName, password })
  ctx.body = result
})

// 修改用户信息
router.post(
  '/changeInfo',
  loginCheck,
  genValidator(userValitate),
  async (ctx, next) => {
    const { nickName, picture } = ctx.request.body
    const result = await changeInfo(ctx, { nickName, picture })
    ctx.body = result
  }
)

// 修改密码
router.post(
  '/changePassword',
  loginCheck,
  genValidator(userValitate),
  async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo
    ctx.body = await changePassword(userName, password, newPassword)
  }
)

router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx)
})

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
      // 测试环境下，测试账号登录之后，删除自己
      const { userName } = ctx.session.userInfo
      ctx.body = await deleteCurUser(userName)
  }
})

module.exports = router
