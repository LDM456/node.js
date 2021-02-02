let path = require('path');

// 解析目录的后缀名
let strPath = 'https://a.msstatic.com/huya/main3/static/img/logo.png'
let info = path.extname(strPath)
console.log(info);

let os = require('os');
//查看cpu
console.log(os.cpus())
    // 查看内存
console.log(os.totalmem());
// 查看系统架构‘
console.log(os.arch());
// 剩余内存
console.log(os.freemem());
// 操作平台
console.log(os.platform());