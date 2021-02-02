const crypto = require('crypto'),
  jwt = require('jsonwebtoken')

// 连接数据库
let userList = []

class userController {
  // 用户登录
  static async login(ctx) {
    const data = ctx.request.body
    if (!data.name || !data.password) {
      return (ctx.body = {
        code: '0000',
        message: '参数不合法',
      })
    }
    console.log(data)
    const result = userList.find(
      (item) =>
        item.name == data.name &&
        item.password ===
          crypto.createHash('md5').update(data.password).digest('hex'),
    )
    if (result) {
      const token = jwt.sign(
        {
          name: result.name,
        },
        'Gopal_token',
        { expiresIn: 60 * 60 },
      )
      return (ctx.body = {
        code: 200,
        message: '登录成功',
        data: {
          token,
        },
      })
    } else {
      return (ctx.body = {
        code: '0000',
        message: '用户名或密码不正确',
      })
    }
  }

  // 用户注册
  static async register(ctx) {
    const data = ctx.request.body
    if (!data.name || !data.password) {
      return (ctx.body = {
        code: '0000',
        message: '参数不合法',
      })
    }
    const result = userList.find((item) => item.name === data.name)
    if (result) {
      return (ctx.body = {
        code: '0000',
        message: '用户已存在',
      })
    }
    const user = {
      name: data.name,
      password: crypto.createHash('md5').update(data.password).digest('hex'),
    }
    userList.push(user)
    return (ctx.body = {
      code: '200',
      message: '注册成功',
    })
  }

  // 用户信息
  static async userInfo(ctx) {
    const data = ctx.state.user
    return (ctx.body = {
      code: '0',
      data: {
        ...data,
      },
    })
  }
}

module.exports = userController
