// Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。

// Stream 有四种流类型：
//  Readable - 可读操作。
//  Writable - 可写操作。
//  Duplex - 可读可写操作.
//  Transform - 操作被写入数据，然后读出结果。

// 所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
//  data - 当有数据可读时触发。
//  end - 没有更多的数据可读时触发。
//  error - 在接收和写入过程中发生错误时触发。
//  finish - 所有数据已被写入到底层系统时触发。

//1. 从流中读取数据
var fs = require('fs');
var data = '';

var readerStream = fs.createReadStream('file.txt'); //创建可读流
readerStream.setEncoding('utf8'); //设置编码
//处理流事件---data end error
readerStream.on('data', function(chunk){
    data += chunk;
})
readerStream.on('end', function(){
    console.log(data)
})
readerStream.on('error', function(err){
    console.log(err.stack)
})
console.log('finish')

//2. 写入流
var fs = require('fs');
var data2 = '写入数据';

var writeStream = fs.createWriteStream('output.txt'); //创建写入流
writeStream.write(data2, 'utf8'); //将data2用utf8编码写入
writeStream.end(); //标记文件末尾

// 处理流事件--finish error
writeStream.on('finish', function(){
    console.log("finished")
})

writeStream.on('error', function(err){
    console.log(err.stack)
})

console.log('jieshu ')

//3. 管道流：从一个流中获取数据并将数据传递到另外一个流中
var fs = require('fs');

var readerStream1 = fs.createReadStream('file.txt');
var writeStream1 = fs.createWriteStream('output1.txt'); 
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream1.pipe(writeStream1);
console.log('finished')

// 4. 链式流：通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作

// 用管道和链式来压缩文件:
var fs = require("fs");
var zlib = require('zlib');
// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
console.log("文件压缩完成。");

//解压文件
var fs = require("fs");
var zlib = require('zlib');
// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));
  
console.log("文件解压完成。");