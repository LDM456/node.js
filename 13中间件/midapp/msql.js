let sql = require('mysql')
let options = {
    host: 'localhost',
    user: 'root',
    password: '835495947@qq.com',
    database: 'bookapp'
}

// 数据库连接
let con = sql.createConnection(options);
// 建立连接
con.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('数据库连接成功');
    }
})

// 调用查询
function sqlQuery(strSql, arr) {
    return new Promise(function(resolve, reject) {
        con.query(strSql, arr, (err, result) => {
            if (err) {
                // console.log(err);
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = sqlQuery