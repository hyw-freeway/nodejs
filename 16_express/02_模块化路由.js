const express = require('express')
const router = require('./02_router') //导入自定义模块路由
const app = express();

// 注意： app.use() 函数的作用，就是来注册*全局中间件*
// app.use('/files', express.static('./files'))
app.use('/api', router)	// 2. 注册路由模块，若想使用静态资源一样可以加统一的访问前缀

app.listen(80, ()=>{
    console.log('server running at http://127.0.0.1')
})