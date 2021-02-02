const fs = require('fs')

fs.mkdir('./img', (err) => {
  if (err) {
    console.log(err)
    return
  } else {
    console.log('创建成功：', './img/')
  }
})
