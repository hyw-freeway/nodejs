const db = require("../db/index");

// 在头部区域导入 bcryptjs 后，
// 即可使用 bcrypt.compareSync(提交的密码，数据库中的密码) 方法验证密码是否正确
// compareSync() 函数的返回值为布尔值，true 表示密码正确，false 表示密码错误
const bcrypt = require('bcryptjs')

//获取当前用户信息
exports.getUserInfo = (req, res) => {
  db.query(
    "select id, username, nickname, email, user_pic from ev_users where id=?",
    req.user.id,
    (err, results) => {
      if (err) return res.cc(err);
      // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
      if (results.length !== 1) return res.cc("获取用户信息失败！");
      res.send({
        status: 0,
        message: "获取用户基本信息成功！",
        data: results[0],
      });
    }
  );
};

//更新用户信息
exports.updateUserInfo = (req, res) => {
    db.query(
      "update ev_users set ? where id=?",
      [req.body, req.user.id],
      (err, results) => {
        if (err) return res.cc(err);
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.affectedRows !== 1) return res.cc("修改用户信息失败！");
        res.cc('修改用户基本信息成功！', 0)
      }
    );
  };

  //重置密码
  exports.updatePassword = (req, res) => {
    db.query('select * from ev_users where id=?', req.user.id, (err, results) => {
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('用户不存在！')

        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if(!compareResult) return res.cc('原密码错误！')

        db.query('update ev_users set password=? where id=?', [req.body.newPwd, req.user.id], (err, results)=>{
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) res.cc('更新密码失败！')
            res.cc('更新密码成功！', 0)
        })
    })
  }

  //更新头像
exports.updateAvatar = (req, res) => {
  db.query('update ev_users set user_pic=? where id=?', [req.body.avatar, req.user.id], (err, results)=>{
    // 执行 SQL 语句失败
  if (err) return res.cc(err)

  // 执行 SQL 语句成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.cc('更新头像失败！')

  // 更新用户头像成功
  return res.cc('更新头像成功！', 0)
  } 
  )}