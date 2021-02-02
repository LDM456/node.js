const fs = require('fs');

fs.readFile('hello.txt', { flag: 'r', encoding: 'utf-8' }, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        // console.log(data);
        // 读取成功后的操作
        // 1、读取数据库中的所有用户数据
        // 2、统计用户年龄
        // 3、查看用户账号详情
        jsEvent.emit('fileSucess', data);
    }
});
let jsEvent = {
    event: {},
    on: function(eventName, eventFn) {
        if (this.event[eventName]) {
            this.event[eventName].push(eventFn);
        } else {
            this.event[eventName] = [];
            this.event[eventName].push(eventFn);
        }
    },
    emit: function(eventName, eventMsg) {
        if (this.event[eventName]) {
            this.event[eventName].forEach(itemFn => {
                itemFn(eventMsg)
            });
        }
    }
}

jsEvent.on('fileSucess', function(dataMsg) {
    console.log('1、读取数据库中的所有用户数据', dataMsg);
});
jsEvent.on('fileSucess', function(dataMsg) {
    console.log('2、统计用户年龄', dataMsg);
});
jsEvent.on('fileSucess', function(dataMsg) {
    console.log('3、查看用户账号详情', dataMsg);
});