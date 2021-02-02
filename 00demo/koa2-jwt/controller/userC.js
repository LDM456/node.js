const crypto = require('crypto'),
  jwt = require('jsonwebtoken')

// TODO:使用数据库
//演示暂时使用本地列表
let userList = []

class UserController {
  // 注册用户信息
  static async register(ctx) {
    const data = ctx.request.body
    const checkUser = userList.find((item) => item.name == data.name)
    if (checkUser) {
      return (ctx.body = {
        code: '000002',
        message: '该用户名已存在',
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

  //用户登录
  static async login(ctx) {
    const data = ctx.request.body
    if (!data.name || !data.password) {
      return (ctx.body = {
        code: '000002',
        message: '参数不合法',
      })
    }

    // var md5 = crypto.createHash(‘md5’);
    // md5.update(‘foo’);//接受明文data数据
    // md5.digest();//返回加密的密文，默认返回的是2进制的数据，
    // md5.digest(‘hex’); //返回加密的密文，以16进制的形式打印
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
        'Gopal_token', //secret
        { expiresIn: 60 * 60 }, //60*60s
      )

      return (ctx.body = {
        code: '200',
        message: '登录成功',
        data: {
          token,
        },
      })
    } else {
      return (ctx.body = {
        code: '000002',
        message: '用户名或密码错误',
      })
    }
  }

  // 获取用户信息
  static async userinfo(ctx) {
    const data = ctx.state.user
    return (ctx.body = {
      code: '200',
      data: {
        ...data,
      },
    })
  }
}

module.exports = UserController
