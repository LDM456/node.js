var express = require('express');
var path = require('path');
var app = express();
var mallList = require('./routes/routerSearch/searchMall')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



// 解析url地址中间件
app.use((req, res, next) => {
    try {
        let splitRes = req.url.split('?');
        if (splitRes.length > 0) {
            let queryStr = splitRes[1];
            if (queryStr == undefined) next();
            // 对表单提交的键值对进行切割
            let keyValues = queryStr.split('&');
            // 存储对象
            let queryObj = {};
            keyValues.forEach((item, i) => {
                let key = item.split('=')[0];
                let value = item.split('=')[1];
                queryObj[key] = value
            })
            req.DIYquery = queryObj;
            next()
        } else {
            next()
        }
    } catch (error) {

    }
    next()
})


// 添加中间件
app.use(function(req, res, next) {
    res.addNum = function(a, b) {
        return a + b;
    }
    console.log('访问任意页面，次函数都会调用');
    next()
})

// 首页
app.get('/', (req, res) => {
    console.log(req.DIYquery);
    res.send('这是首页' + res.addNum(7, 8))
});

app.use('/list', mallList)

module.exports = app;