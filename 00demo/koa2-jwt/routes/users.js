const router = require('koa-router')()
const userC = require('../controller/userC')

router.prefix('/api')

router.post('/register', userC.register)
router.post('/login', userC.login)
router.get('/info', userC.userinfo)

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
