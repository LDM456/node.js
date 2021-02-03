const http = require('http')
const { createProxyMiddleware } = require('http-proxy-middleware')

const server = http.createServer((req, res) => {
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
