const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const url = `https://www.doutula.com/article/list/?page=2`;

// 设置爬取页面数
let pageNum = 100;

// 爬取首层页面
async function getPage(i) {
    let url = `https://www.doutula.com/article/list/?page=` + i
    let res = await axios.get(url);
    // 解析html
    let $ = cheerio.load(res.data);
    fs.mkdir('./img', (err) => {
        if (err) {} else {
            console.log('创建成功IMG');
        }
    })
    $('#home .col-sm-9>a').each((i, ele) => {
        // console.log($(ele).attr('href'));
        let hrefs = $(ele).attr('href');
        let title = $(ele).find('.random_title').text();
        // console.log(title);
        let reg = /(.*?)\d/igs;
        title = reg.exec(title)[1];
        console.log(title);
        fs.mkdir('./img/' + title, err => {
            if (err) {} else {
                console.log('创建成功:', title);
            }
        });
        // 开始爬取页面内具体图片
        getPageList(hrefs, title)
    })
}

async function getPageList(url, title) {
    let res = await axios.get(url);
    let $ = cheerio.load(res.data);
    $('.pic-content a>img').each((i, ele) => {
        // 获取title名称
        let imgUrl = $(ele).attr('src');
        // 截取扩展名
        let extName = path.extname(imgUrl);
        // 写入图片的地址和名字
        let imgPath = `./img/${title}/${title}-${i}${extName}`;
        // 设置写入流
        let ws = fs.createWriteStream(imgPath);
        // 下载图片并写入
        axios.get(imgUrl, { responseType: 'stream' }).then(res => {
            res.data.pipe(ws);
            console.log('正在下载：', title);
            res.data.on('close', () => {
                ws.close()
            })
        })
    })
}
async function spider() {
    for (let i = 1; i <= pageNum; i++) {
        setTimeout(() => {
            getPage(i)
        }, 500);
    }
}
spider()