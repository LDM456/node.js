const fs = require('fs');
const event = require('event');
const ee = event.eventEmitter();


ee.on('fileSucess', function(dataMsg) {
    console.log('1、读取数据库中的所有用户数据', dataMsg);
});
ee.on('fileSucess', function(dataMsg) {
    console.log('2、统计用户年龄', dataMsg);
});
ee.on('fileSucess', function(dataMsg) {
    console.log('3、查看用户账号详情', dataMsg);
});

fs.readFile('hello.txt', { flag: 'r', encoding: 'utf-8' }, function(err, data) {
    return new Promise(function(resovle, reject) {
        if (err) {
            reject(err)
        } else {
            resovle(data)
        }
    })
});