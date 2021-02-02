const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

let httpurl = `https://www.doutula.com/article/list/?page=1`
// 获取总数进行全部图片的爬虫
async function getNum() {
  let res = await axios(httpurl)
  let $ = cheerio.load(res.data)
  let liLength = $('.pagination li').length
  let theNum = $('.pagination li')
    .eq(liLength - 2)
    .find('a')
    .text()
  return theNum
}
async function spider() {
  let allPage = await getNum()
  for (let i = 1; i <= allPage; i++) {
    getPageList(i)
  }
}
async function getPageList(pageNum) {
  let httpurl = `https://www.doutula.com/article/list/?page=${pageNum}`
  // cheerio解析html文档为jq模式
  let res = await axios.get(httpurl)
  let $ = cheerio.load(res.data)
  // 获取所有表情的页面的连接
  $('#home .col-sm-9>a').each((i, element) => {
    let pageUrl = $(element).attr('href')
    let title = $(element).find('.random_title').text()
    let reg = /(.*?)\d/gis
    title = reg.exec(title)[1]
    // 创建目录
    fs.mkdir('./img/' + title, (err) => {
      if (err) {
      } else {
        console.log('创建成功：', './img/' + title)
      }
    })
    // console.log(title);
    setTimeout(parseUrl(pageUrl, title), 500)
  })
}

async function parseUrl(url, title) {
  let res = await axios.get(url)
  let $ = cheerio.load(res.data)
  $('.pic-content img').each((i, ele) => {
    let imgUrl = $(ele).attr('src')
    // console.log(imgUrl);
    // 截取扩展名
    let extName = path.extname(imgUrl)
    // 图片写入的路径和名字
    let imgPath = `./img/${title}/${title}-${i}${extName}`

    let ws = fs.createWriteStream(imgPath)
    //获取图片地址写入文件夹
    axios.get(imgUrl, { responseType: 'stream' }).then((res) => {
      res.data.pipe(ws)
      console.log('正在下载..', title)
      //下载完成关闭写入流
      res.data.on('close', () => {
        ws.close()
      })
    })
  })
}
spider()
