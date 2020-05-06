const router = require('koa-router')()

router.prefix('/users')

// 用户登录
router.get('/login', function (ctx, next) {
  
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
