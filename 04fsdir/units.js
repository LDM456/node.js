let fs = require('fs');
// 读取
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


// 写入

function fsWrite(path, fileText) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(path, fileText, { flag: 'a', enconding: 'utf-8' }, function(err) {
            if (err) {
                // console.log('失败');
                reject(err)
            } else {
                // console.log('成功');
                resolve(err)
            }
        })
    })
}

module.exports = {
    fsWrite,
    fsRead
}