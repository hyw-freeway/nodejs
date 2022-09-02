// 定义多个局部中间件

const express = require('express')

const app = express()

// 1. 定义中间件函数
const mw1 = (req, res, next) => {
  console.log('调用了局部生效的中间件')
  next()
}

const mw2 = (req, res, next) => {
  console.log('调用了第二个局部生效的中间件')
  next()
}

// 2. 创建路由，可见mw1，mw2只会在对应有调用的中间件中生效，调用：在get中的url和method中加一个/多个参数
//以下两种方式等价
app.get('/', mw1, nw2, (req, res) => {res.send('Home page.')})
app.get('/user', [mw1, mw2],(req, res) => {res.send('User page.')})

app.listen(80, function () {console.log('Express server running at http://127.0.0.1')})
