var express = require('express');
var sqlQuery = require('../../msql');
// 查询图书列表
// mallList.get('/', (req, res) => {
//     console.log(req.DIYquery);
//     res.send('这是首页' + res.addNum(7, 8))
// });
// mallList.get('/searchMall', (req, res) => {
//     console.log(req.DIYquery);
//     res.send('列表页')
// })
//提供前端AJAX请求的接口
let mallList = express.Router();
//允许前端跨域请求的中间件
mallList.use(function(req, res, next) {
    res.append('Access-Control-Allow-Origin', "*")
    res.append('Access-Control-Allow-Content-Type', "*")
    next()
})

async function getCataory() {
    //获取所有分类
    let sqlStr = "select * from cataory";
    let result = await sqlQuery(sqlStr);
    return Array.from(result);
}
// 获取分类下的第N页的book数据
mallList.get('/book/cataory/:cid/page/:pid', async(req, res) => {
    let page = parseInt(req.params.pid)
    let sqlStr;
    let result;
    let arr;
    let sqlStr1;
    if (req.params.cid == 0) {
        sqlStr = "select id,bookname,bookimg,author,cataory from book limit ?,28"
        arr = [(page - 1) * 28];
        result = await sqlQuery(sqlStr, arr)
        sqlStr1 = "select count(id) as num  from book"
    } else {
        sqlStr = "select id,bookname,bookimg,author,cataory from book WHERE cataory in (SELECT cataory from cataory WHERE id = ?) limit ?,28"
        arr = [req.params.cid, (page - 1) * 28];
        result = await sqlQuery(sqlStr, arr)
        sqlStr1 = "select count(id) as num  from book WHERE cataory in (SELECT cataory from cataory WHERE id = ?)"
    }



    //获取总页数
    let result1 = await sqlQuery(sqlStr1, arr)
    let pageAll = Math.ceil(result1[0].num / 28);
    let cid = req.params.cid
        //设置分页的起始点
    let startPage = (page - 4) < 1 ? 1 : (page - 4);
    let endPage = (page + 5) > pageAll ? pageAll : page + 5;
    let options = {
        books: Array.from(result),
        cataorys: await getCataory(),
        pageAll,
        page,
        cid,
        startPage,
        endPage
    }


    res.json(options)


})



module.exports = mallList