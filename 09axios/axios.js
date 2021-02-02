let axios = require('axios')

let httpUrl = `https://www.bilibili.com/`
console.log(111111)
axios.get(httpUrl).then((res) => {
  console.log(res.status)
})
