// Node.js 使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。

// 当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。

// 这个模型非常高效可扩展性非常强，因为 webserver 一直接受请求而不等待任何读写操作。（这也称之为非阻塞式IO或者事件驱动IO）

// 在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数。


// Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件，如下实例：

//引入events模块
var events = require('events');
//new eventEmitter实例
var eventEmitter = new events.EventEmitter();

//定义连接事件
var connectHandler = function connection(){
    console.log('connection success')
    //触发数据接收事件
    eventEmitter.emit('data_received')
}

//注册连接事件监听
eventEmitter.on('connection', connectHandler);
//注册数据接收事件监听+定义
eventEmitter.on('data_received', function (){
    console.log('data_receive finished')
})

//触发连接事件
eventEmitter.emit('connection')

console.log('all finished')

// 1.引入 events模块 var events = require('events')，eventEmitter = new events.EventEmitter()
// 2.定义事件 var xxx = function(){}
// 3.绑定事件 eventEmitter.on('事件别名', xxx)
// 4.执行事件 eventEmitter.emit('事件别名')