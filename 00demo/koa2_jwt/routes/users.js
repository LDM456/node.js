const router = require('koa-router')()
const user = require('../controller/user')

router.prefix('/users')
router.post('/login', user.login)
router.post('/register', user.register)
router.get('/userInfo', user.userInfo)

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
