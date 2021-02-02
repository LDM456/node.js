// let url = require('url')

// let httpurl = new URL(`https://v.youku.com/v_show/id_XMT
// gxMDcyMjg5Mg==.html?spm=a2hcb.12523958.m_4392_c_25192.d_1&s=cc001f06962411de83b1
// &scm=20140719.rcmd.4392.show_cc001f06962411de83b1`)
// let urlObj = httpurl.search
// var newArr = urlObj.shift().split('&')
// var newObj = {}
// for (var i = 0; i < newArr.length; i++) {
//   newObj[newArr[i].split('=')[0]] = newArr[i].split('=')[1]
// }
// console.log(newObj)

const url = require('url')
const logger = require('../logger')
const httpUrl = 'https://www.baidu.com:8080/path/index.html?id=2#tag=1'
const myurl = new URL(httpUrl)
logger.debug(myurl.port)
