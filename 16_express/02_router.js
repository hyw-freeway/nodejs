const express = require('express')	    // 1. 导入 express
const router = express.Router()			// 2. 创建路由对象

// 3. 挂载具体的路由
router.get('/user/list', (req, res) => {res.send('Get user list.')})
router.post('/user/add', (req, res) => {res.send('Add new user.')})

// 4. 向外导出路由对象
module.exports = router
