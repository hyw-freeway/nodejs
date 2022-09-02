const express = require('express')
const router = express.Router();

//挂载对应路由
router.get('/get', (req, res)=>{
    const query = req.query
    res.send({
        status: 0, //0 is success, 1 is false
        msg: 'success',
        data: query
    })
}),
router.post('/post', (req, res)=>{
    const body = req.body //注意如果要获取urlencoded格式的请求体数据，需要配置中间件app.use(express.urlencoded({extended:false}))
    res.send({
        status: 0, //0 is success, 1 is false
        msg: 'success',
        data: body
    })
}),
router.delete('/delete', (req, res) => {
    res.send({
      status: 0,
      msg: 'DELETE请求成功',
    })
  })
module.exports = router;
