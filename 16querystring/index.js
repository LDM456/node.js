const logger = require('../logger')
const queryStr = require('querystring')

let str = 'id=2&name=tongy&from=北京'
let str1 = 'id:2/name:tongy/from:北京'
let str2 = 'id%3D2%26name%3Dtongy'
let str3 = { id: 2, name: 'tony' }

// logger.debug(queryStr.parse(str, '&', '=')) //将url字符串转为对象
// logger.debug(queryStr.stringify(str3, '/', ':'))//将对象序列化为url字符串
// logger.debug(queryStr.unescape(str2)) //将url编码转成url字符串
// logger.debug(queryStr.escape(str))//将url字符串进行编码转换
// logger.debug(queryStr.parse(str))//将url字符串转成对象
// logger.debug(
//   //将对象转成url字符串
//   queryStr.stringify(str3, null, null, {
//     encodeURIComponent(string) {
//       return queryStr.unescape(string)
//     },
//   }),
// )
