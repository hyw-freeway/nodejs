
const express = require('express')
const app = express()

// 导入自己封装的中间件模块，将自定义的中间件函数，注册为全局可用的中间件
app.use(require('./custom-body-parser'))

app.post('/user', (req, res) => {
  res.send(req.body)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})