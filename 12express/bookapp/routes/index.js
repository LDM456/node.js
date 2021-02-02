var express = require('express');
var router = express.Router();
let sqlQuery = require('../msql');
const { route } = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/ajax', async(req, res) => {
    res.render('ajax')
})
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'login' });
});

// 动态路由

// router.get('/news/:categortId/a:newId', (req, res, next) => {
//     req.ldmHost = '127.0.0.233';
//     next()
// }, (req, res) => {
//     console.log('categoryId', req.params.categortId, 'newId' + req.params.newId);
//     res.send('categoryId:' + req.params.categortId + 'newId:' + req.params.newId + '主机名' + req.ldmHost)

// })

// router.get('/', async(req, res) => {
//     let strSql = "select * from book limit 0,28;";
//     let result = await sqlQuery(strSql);
//     res.json(Array.from(result))
// })

router.get('/xiaoshuowenxue', async(req, res) => {
    let strSql = 'select id , bookname,bookimg,author,cataory from book where(cataory="小说文学") limit 0,28;';
    let result = await sqlQuery(strSql);
    res.json(Array.from(result))
})
router.get('/book/:bookid', async(req, res) => {
    let strSql = 'select * from book where id=?';
    let bookid = req.params.bookid
    let result = await sqlQuery(strSql, [bookid]);
    res.json(Array.from(result))
})
router.post('/search2', async(req, res) => {
    console.log(req.query);
    console.log(req.body);
    res.send('post请求')
})


router.get('/search1', async(req, res) => {
    console.log(req.query);
    let sql = "select id , bookname,cataory from book where bookname like '%" + req.query.searchKey + "%'"
    let result = await sqlQuery(sql)
    res.json(Array.from(result))
})

router.post('/login1', async(req, res) => {
    // post请求的内容在body中
    let username = req.body.username
    let password = req.body.password
    let sql = 'select * from user where username = ? and password = ?';
    let arr = [username, password]
    let result = await sqlQuery(sql, arr)
    console.log(result);
    if (result.length == 0) {
        res.send('登录失败')
    } else {
        res.send('登录成功')
    }
})



module.exports = router;