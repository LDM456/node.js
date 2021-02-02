let readLine = require('readline');
let { fsWrite } = require('./units')
    // 创建readline实例接口对象
var r1 = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

// r1 提问方法、
// r1.question('你的名字？', function(answer) {
//     console.log('等待输入：', answer);
//     r1.close()
// });

function lcQuestion(title) {
    return new Promise(function(resovle, reject) {
        r1.question(title, function(answer) {
            resovle(answer)
        });
    })
}

async function createPackage() {
    let name = await lcQuestion('你的包名：');
    let author = await lcQuestion('作者：');
    var content = `{
        "name": "${name}",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
          "test": "echo \\"Error: no test specified\\" && exit 1"
        },
        "keywords": [],
        "author": "${author}",
        "license": "ISC"
      } `

    await fsWrite('package.json', content)
    r1.close()
}

createPackage()

// close事件监听
r1.on('cloes', function() {
    process.exit(0)
})