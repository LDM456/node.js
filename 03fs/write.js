let fs = require('fs');
// var fileText = 'sdsd、、n/n';
//  同步写入
// fs.writeFile('test.txt', fileText, { flag: 'w', enconding: 'utf-8' }, function(err) {
//     if (err) {
//         console.log('失败');
//     } else {
//         console.log('成功');
//     }
// })


function writefs(path, fileText) {
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

async function writeList() {
    await writefs('santi.txt', '1今晚看三体\n');
    await writefs('santi.txt', '2今晚看三体\n');
    await writefs('santi.txt', '3今晚看三体\n');
    await writefs('santi.txt', '4今晚看三体\n');
}
writeList()