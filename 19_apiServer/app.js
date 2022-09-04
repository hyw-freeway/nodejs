const express = require('express')
const cors = require('cors')

const joi = require('joi')
const router = require('./router/user')
const infoRouter = require('./router/userinfo')
// 导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate')
const articleRouter = require('./router/article')
const config = require('./router_handler/config')
const bodyParser = require('body-parser')
// 解析 token 的中间件
const expressJWT = require('express-jwt')

const app = express()

app.use(cors())
// app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))

// 中间件必须在路由前
app.use(function(req, res, next){
    res.cc = function(err, status = 1){
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 错误中间件
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知错误
    res.cc(err)
  })
  
// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

app.use('/api', router)
app.use('/my', infoRouter)

// 为文章分类的路由挂载统一的访问前缀 /my/article
app.use('/my/artcate', artCateRouter)
app.use('/my/article', articleRouter)

app.listen(3007, function(){
    console.log('api server running at http://127.0.0.1:3007')
})