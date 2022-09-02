// 一. 数据库
// 1.1 常见数据库
//   关系型数据库： MySQL, Oracle, SQL Server
//   非关系型数据库： Mongodb

// 1.2 数据组织结构
//   数据库database 数据表table 数据行row 字段field
//   每个项目对应一个独立数据库，不同数据存在不同表中，每个表具体存储什么数据由字段决定，表中每行代表每条数据

// 二. MySQL安装与配置
// 2.1 相关软件
//   MySQL Server: 提供数据存储与服务
//   MySQL Workbench： 可视化MySQL管理工具

// 2.2 安装流程
//   用户名： root
//   密码： admin123

// 三. 基本使用
// 3.1 MySQL Workbench管理数据库
// 3.2 SQL语言管理数据库
//   SQL是结构化查询编程语言，只能在关系型数据库中使用。
//   1. 查询数据
//     SELECT * FROM 表名称
//     SELECT 列名 FROM 表名称

//   2. 插入数据
//     INSERT INTO 表名 （列1， 列2， ...）VALUES （值1， 值2， ....）
//     insert into users (username, password) values ('hyw', '123')
  
//   3. 更新数据
//     UPDATE 表名 SET 列名=新值 WHERE 列名=某值
//     update users set password='abc', status=1 where username='hyw'

//   4. 删除数据
//     DELETE FROM 表名 WHERE 列名=某值
//     delete from users where id=1

//   5. WHERE子句
//     WHERE 列名 运算符 某值

//   6. AND和OR运算符
//     AND表示必须同时满足，如&&: select * from users where status=0 and id<3
//     OR表示满足任意一个，如||: select * from users where status=1 or username='zs'

//   7. ORDER BY 子句
//     根据指定列对结果集进行排序。默认升序ASC，若要降序使用DESC关键字。
//     升序： select * from users order by status;
//     降序： select * from users order by id desc;

//   8. COUNT(*)函数
//     返回查询结果的总数据条数
//     SELECT COUNT(*) FROM 表名
//     select count(*) from users where status=0

//   9. AS关键字
//     给列名起别名
//     select count(*) as total from users where status=0
//     select username as un, password as pw from users 

// 四. 项目中操作MySQL
// 4.1 安装MySQL模块
//   npm install mysql

// 4.2 建立连接
  const mysql = require('mysql')
  // 建立与MySQL的连接
  const db = mysql.createPool({
    host: '127.0.0.1', //数据库的ip地址
    user: 'root', // 数据库账号
    password: 'admin123', // 数据库密码
    database: 'my_db_01', // 数据库名
  })

// 4.3 测试是否正常工作
  db.query('select 1', (err, results) => {
      if (err) return console.log(err.message)
      console.log(results)
    })

// 4.4 操作 mysql 数据库
//     1. 查询数据
    //    db.query('select * from users', (err, results) => {
    //      ...
    //    })
    
    // 2. 插入数据
    //    向表中新增数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速插入数据：
       const user1 = {username:'Bruce', password:'55520'}
       // ? 表示占位符
       const sql1 = 'insert into users (username, password) values (?, ?)'
       // 使用数组的形式为占位符指定具体的值
       db.query(sql1, [user1.username, user1.password], (err, results) => {
         if (err) return console.log(err.message)
         if (results.affectedRows === 1) console.log('插入成功')
       })
      //  快捷方式：
       const user2 = {username:'Bruce1', password:'555201'}
       const sql2 = 'insert into users set ?'
       db.query(sql2, user2, (err, results)  => {
        if (err) return console.log(err.message)
        if (results.affectedRows === 1) console.log('插入成功')
       })
    
    // 3. 更新数据
    //    const sql3 = 'update users set username=?, password=? where id=?'
    //    db.query(sql3, [username, password, id], (err, results) => {
    //      ...
    //    })
    //    快捷方式：
    //    const user3 = {id:7,username:'Bruce',password:'55520'}
    //    const sql3 = 'update users set ? where id=?'
    //    db.query(sql3, [user3, user3.id], (err, results) => {
    //      ...
    //    })
    
    // 4. 删除数据
    //    const sql = 'delete from users where id=?'
    //    db.query(sql, id, (err, results) => {
    //      ...
    //    })
    //    使用 delete 语句会真正删除数据，保险起见，使用标记删除的形式，模拟删除的动作。即在表中设置状态字段，标记当前的数据是否被删除。
    //    db.query('update users set status=1 where id=?', 7, (err, results) => {
    //      ...
    //    })
