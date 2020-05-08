const router = require('koa-router')()

const { isExeit, register, login, changeInfo, changePassword } = require('../controller/user')
const userValitate = require('../validator/user')
const {genValidator} = require('../middlewares/valitator')

router.prefix('/users')

// 用户登录
router.post('/register', genValidator(userValitate),async (ctx, next) => {
  console.log('调了登录接口', ctx)
  const { userName, password, nickName } = ctx.request.body
  const result = await register({ userName, password, nickName })
  ctx.body = result
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  const result = await login(ctx, { userName, password })
  ctx.body = result
})

router.post('/changeInfo',genValidator(userValitate), async (ctx, next) => {
  const {
    nickName,
    picture,
  } = ctx.request.body
  const result = await changeInfo(ctx, { nickName, picture })
  ctx.body = result
})

// 修改密码
router.post('/changePassword', genValidator(userValitate),async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  const { userName } = ctx.session.userInfo
  ctx.body = await changePassword(userName, password, newPassword)
})

module.exports = router
