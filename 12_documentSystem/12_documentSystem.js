// Node.js 提供一组类似 UNIX（POSIX）标准的文件操作API。 Node 导入文件系统模块(fs)
//----------------------------------------------
// 1. 异步和同步
var fs = require("fs");
// 异步读取
fs.readFile('file.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("异步读取: " + data.toString());
});
// 同步读取
var data = fs.readFileSync('file.txt');
console.log("同步读取: " + data.toString());

console.log("程序执行完毕。");

// 具体了解下 Node.js 文件系统的方法:
//----------------------------------------------
// 2. 打开文件
// fs.open(path, flags[, mode], callback)

// path - 文件的路径。
// flags - 文件打开的行为。
// mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
// callback - 回调函数，带有两个参数如：callback(err, fd)。
var fs = require("fs");
// 异步打开文件
console.log("准备打开文件！");
fs.open('file.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
  console.log("文件打开成功！");     
});

//----------------------------------------------
// 3. 获取文件信息
// fs.stat(path, callback)

// path - 文件路径。
// callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。
var fs = require('fs');
fs.stat('/Users/liuht/code/itbilu/demo/fs.js', function (err, stats) {
    console.log(stats.isFile());         //true
})

//----------------------------------------------
// 4. 写入文件
// fs.writeFile(file, data[, options], callback)
// writeFile 直接打开文件默认是 w 模式，所以如果文件存在，该方法写入的内容会覆盖旧的文件内容.

// file - 文件名或文件描述符。
// data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(缓冲) 对象。
// options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
// callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。
var fs = require("fs");
console.log("准备写入文件");
fs.writeFile('input.txt', '我是通 过fs.writeFile 写入文件的内容',  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
   console.log("--------我是分割线-------------")
   console.log("读取写入的数据！");
   fs.readFile('input.txt', function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log("异步读取文件数据: " + data.toString());
   });
});

//----------------------------------------------
// 5. 读取文件
// fs.read(fd, buffer, offset, length, position, callback)

// fd - 通过 fs.open() 方法返回的文件描述符。
// buffer - 数据写入的缓冲区。
// offset - 缓冲区写入的写入偏移量。
// length - 要从文件中读取的字节数。
// position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
// callback - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。

//----------------------------------------------
// 6. 关闭文件
// fs.close(fd, callback)

//----------------------------------------------
// 7. 截取文件
// fs.ftruncate(fd, len, callback)

// fd - 通过 fs.open() 方法返回的文件描述符。
// len - 文件内容截取的长度。
// callback - 回调函数，没有参数。
var fs = require("fs");
var buf = new Buffer.alloc(1024);

console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打开成功！");
   console.log("截取10字节内的文件内容，超出部分将被去除。");
   
   // 截取文件
   fs.ftruncate(fd, 10, function(err){
      if (err){
         console.log(err);
      } 
      console.log("文件截取成功。");
      console.log("读取相同的文件"); 
      fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
         if (err){
            console.log(err);
         }

         // 仅输出读取的字节
         if(bytes > 0){
            console.log(buf.slice(0, bytes).toString());
         }

         // 关闭文件
         fs.close(fd, function(err){
            if (err){
               console.log(err);
            } 
            console.log("文件关闭成功！");
         });
      });
   });
});

//----------------------------------------------
// 8. 删除文件
// fs.unlink(path, callback)

//----------------------------------------------
// 9. 创建目录
// fs.mkdir(path[, options], callback)

// path - 文件路径。
// options 参数可以是：
//    recursive - 是否以递归的方式创建目录，默认为 false。
//    mode - 设置目录权限，默认为 0777。
// callback - 回调函数，没有参数。

//----------------------------------------------
// 10. 读取目录
// fs.readdir(path, callback)
var fs = require("fs");
console.log("查看 /tmp 目录");
fs.readdir("/tmp/",function(err, files){
   if (err) {
       return console.error(err);
   }
   files.forEach( function (file){
       console.log( file );
   });
});

//----------------------------------------------
// 11. fs.rmdir(path, callback)

//----------------------------------------------
// 还有很多