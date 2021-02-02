const logger = require('../logger')
const queryStr = require('querystring')
const http = require('http')
const server = http.createServer((req, res) => {
  let data = ''
  req.on('data', (chunk) => {
    data += chunk
  })
  req.on('end', () => {
    res.writeHead(200, {
      'content-type': 'application/json;charset=utf-8',
    })
    logger.debug(queryStr.parse(data))

    res.write(JSON.stringify(queryStr.parse(data)))
    res.end()
  })
  // https.get('https://www.xiaomiyoupin.com/mtop/market/cat/detail', (result) => {
  //   let data = ''
  //   result.on('data', (chunk) => {
  //     data += chunk
  //   })
  //   result.on('end', () => {
  //     res.writeHead(200, {
  //       'content-type': 'application/json;charset=utf-8',
  //     })
  //     logger.debug(data)
  //     res.write(data)
  //     res.end()
  //   })
  // })
})

server.listen(8881, () => {
  console.log('localhost:8881')
})
