const db = require("../db")

// 导入处理路径的核心模块
const path = require('path')


// 发布新文章的处理函数

exports.addArticle = (req, res) => {
    console.log(req.body) // 文本类型的数据
    console.log('--------分割线----------')
    console.log(req.file) // 文件类型的数据

   // 手动判断是否上传了文章封面
   if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')

   db.query(`insert into ev_articles set ?`, {
    // 标题、内容、状态、所属的分类Id
    ...req.body,
    // 文章封面在服务器端的存放路径
    cover_img: path.join('/uploads', req.file.filename),
    // 文章发布时间
    pub_date: new Date(),
    // 文章作者的Id
    author_id: req.user.id,
  }, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
  
    // 执行 SQL 语句成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.cc('发布文章失败！')
  
    // 发布文章成功
    res.cc('发布文章成功', 0)
  })
    res.send('ok')
  }

exports.getArticleList= (req, res) => {
  db.query('select count(*) as total from ev_articles ', function (err, rows) {
    if (err) return res.cc(err)

    if (rows.length !== 1) return res.cc('获取文章列表失败！')

    // console.log(rows[0].total)
    // return rows[0].total
    // 当前页的第一个索引值
  const pageIndex = (req.query.pagenum - 1) * req.query.pagesize

  db.query(
    'SELECT arl.id, arl.title, arl.pub_date, arl.state, arc.name,(SELECT COUNT(*) FROM ev_articles) AS total FROM ev_articles AS arl,ev_article_cates AS arc  WHERE arl.cate_id = arc.id and cate_id like "%' +
      req.query.cate_id +
      '%" and state like "%' +
      req.query.state +
      '%" LIMIT ?, ?',
    [pageIndex, req.query.pagesize],
    function (err, rows) {
      if (err) return res.cc(err)

      var total = 0
      if (rows.length === 0) {
        total = 0
      } else {
        total = rows[0].total
      }
      return res.send({
        code: 0,
        message: '获取文章列表成功！',
        total: total,
        data: rows
      })
    })
})
}



exports.getArticleDetail= (req, res) => {
  db.query(
    'SELECT arl.id, arl.title, arl.content, arl.cover_img, arl.pub_date, arl.state, arl.cate_id, arl.author_id, arc.name, ev_users.username, ev_users.nickname FROM ev_articles AS arl, ev_article_cates AS arc, ev_users WHERE arl.cate_id = arc.id and arl.author_id = ev_users.id and arl.id = ?',
    [req.query.id],
    function (err, rows) {
      if (err) return res.cc(err)

      if (rows.length !== 1) return res.cc('没有查到对应的数据！')

      return res.send({
        code: 0,
        message: '获取文章成功！',
        data: rows[0]
      })
    }
  )
}

exports.delArticle= (req, res) => {
  db.query('update ev_articles set is_delete=1 where id=?', [req.query.id], function (err, rows) {
    if (err) return res.cc(err)

    if (rows.affectedRows !== 1) return res.cc('您要删除的文章不存在！')

    return res.cc('删除成功！', 0)
  })
}