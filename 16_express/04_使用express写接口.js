const express = require('express')
const cors = require('cors')
const router = require('./04_apiRouter')
const app = express()

// 配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}))

// 必须在cors之前配置jsonp接口
app.get('/api/jsonp', (req, res)=>{
   // 定义 JSONP 接口具体的实现过程
   const funcName = req.query.callback	// 1. 得到函数的名称
   const data = { name: 'zs', age: 22 }	// 2. 定义要发送到客户端的数据对象
   const scriptStr = `${funcName}(${JSON.stringify(data)})`	// 3. 拼接出一个函数的调用
   res.send(scriptStr)		// 4. 把拼接的字符串，响应给客户端
} )

// 在导入路由前配置cors中间件，解决跨域问题
app.use(cors())
 
// 导入路由
app.use('api', router)

app.listen(80,()=>{
    console.log('server running at http://127.0.0.1')
})