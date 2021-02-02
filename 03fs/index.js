var fs = require('fs');
//导入模块
// node的读写文件也有同步和异步的接口


// 同步
// var tb = fs.openSync('helloword.txt', 'r');
// console.log(tb);

// var bf = Buffer.alloc(20)
// var content = fs.readFileSync('helloword.txt', { flag: 'r', encoding: 'utf-8' })

// 异步
// fs.readFile('helloword.txt', { flag: 'r', encoding: 'utf-8' }, function(err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

function fsRead(path) {
    return new Promise(function(resovle, reject) {
        fs.readFile(path, { flag: 'r', encoding: 'utf-8' }, function(err, data) {
            if (err) {
                // console.log(err);
                reject(err)
            } else {
                // console.log(data);
                resovle(data)
            }
        })
    })
}

// var w1 = fsRead('helloword.txt')
// w1.then(res => {
//     console.log(res);
// })

async function ReadList() {
    const file2 = await fsRead('hello.txt');
    const file3 = await fsRead(`${file2}.txt`);
    const finallContent = await fsRead(`${file3}.txt`);
    console.log(finallContent);
}

ReadList()
    // console.log(content);