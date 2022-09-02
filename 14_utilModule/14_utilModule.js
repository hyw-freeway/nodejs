// 1. OS 模块
var os = require("os");
// CPU 的字节序
console.log('endianness : ' + os.endianness());
// 操作系统名
console.log('type : ' + os.type());
// 操作系统名
console.log('platform : ' + os.platform());
// 系统内存总量
console.log('total memory : ' + os.totalmem() + " bytes.");
// 操作系统空闲内存量
console.log('free memory : ' + os.freemem() + " bytes.");

// 2. Path 模块
var path = require("path");
// 格式化路径
console.log('normalization : ' + path.normalize('/test/test1//2slashes/1slash/tab/..'));
// 连接路径
console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));
// 转换为绝对路径
console.log('resolve : ' + path.resolve('main.js'));
// 路径中文件的后缀名
console.log('ext name : ' + path.extname('main.js'));

// 3. Net 模块

// server.js
var net = require('net');
var server = net.createServer(function(connection) { 
   console.log('client connected');
   connection.on('end', function() {
      console.log('客户端关闭连接');
   });
   connection.write('Hello World!\r\n');
   connection.pipe(connection);
});
server.listen(8080, function() { 
  console.log('server is listening');
});

// client.js
var net = require('net');
var client = net.connect({port: 8080}, function() {
   console.log('连接到服务器！');  
});
client.on('data', function(data) {   //当接收到数据时触发
   console.log(data.toString());
   client.end();
});
client.on('end', function() {        //当 socket 另一端发送 FIN 包时，触发该事件
   console.log('断开与服务器的连接');
});

// 4. DNS 模块：DNS 模块用于解析域名。
var dns = require('dns');

dns.lookup('www.github.com', function onLookup(err, address, family) { //将域名（比如 'runoob.com'）解析为第一条找到的记录 A （IPV4）或 AAAA(IPV6)。
   console.log('ip 地址:', address); //address: 192.30.252.130

   dns.reverse(address, function (err, hostnames) {  //反向解析 IP 地址，指向该 IP 地址的域名数组。
   if (err) {
      console.log(err.stack);
   }

   console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));  //反向解析192.30.252.130: ["github.com"]
});  
});

// 5. Domain 模块
