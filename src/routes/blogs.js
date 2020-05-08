const router = require('koa-router')()


router.prefix('/blogs')

// 用户登录

router.get('/', async (ctx, next) => {
    ctx.body = 'blogs index'
})

router.get('/list', async (ctx, next) => {
    ctx.body = 'blogs list'
})

module.exports = router
