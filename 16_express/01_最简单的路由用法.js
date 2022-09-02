const express = require('express')
const app = express();

app.get('/',(req,res)=>{
    res.send('hello world')
})
app.post('/',(req,res)=>{
    res.send('post req')
})
//实际很少将路由挂载在app上

app.listen(80,()=>{
    console.log('server running at http://127.0.0.1')
})