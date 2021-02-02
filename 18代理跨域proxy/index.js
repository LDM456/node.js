const http = require('http'),
  url = require('url')
const { createProxyMiddleware } = require('http-proxy-middleware')

const server = http.createServer((req, res) => {
  const urlstr = req.url
  const proxyapi = createProxyMiddleware('/api', {
    target: 'https://silkroad.csdn.net',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  })
  proxyapi(req, res)
})

server.listen(3000, () => {
  console.log('locahost：3000')
})
