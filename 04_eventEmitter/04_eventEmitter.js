// EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。

// 当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。

var events = require('events'); 
var emitter = new events.EventEmitter(); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener1', arg1, arg2); 
}); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener2', arg1, arg2); 
}); 
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 

// emitter 为事件 someEvent 注册了两个事件监听器，然后触发了 someEvent 事件。

// 运行结果中可以看到两个事件监听器回调函数被先后调用。 这就是EventEmitter最简单的用法。


//一. EventEmitter 实例对象方法

// 1. addListener(event, listener)
//     为指定事件添加一个监听器到监听器数组的尾部。

// 2. on(event, listener)
//     为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。1和2一样功能

// 3. once(event, listener)
//     为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
//     server.once('connection', function (stream) {
//       console.log('Ah, we have our first user!');
//     });

// 4. removeListener(event, listener)
//     移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。

// 5. removeAllListeners([event])
//     移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。

// 6. setMaxListeners(n)
//     默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于改变监听器的默认限制的数量。

// 7. listeners(event)
//     返回指定事件的监听器数组。

// 8. emit(event, [arg1], [arg2], [...])
//     按监听器的顺序执行执行每个监听器，如果事件有注册监听返回 true，否则返回 false。

//二. EventEmitter 类方法
// 1. listenerCount(emitter, event)
//     返回指定事件的监听器数量。
//     events.emitter.listenerCount(eventName) //推荐

//三. error 事件
//   EventEmitter 定义了一个特殊的事件 error，它包含了错误的语义，我们在遇到 异常的时候通常会触发 error 事件。

//   当 error 被触发时，EventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并输出错误信息。

//   我们一般要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃。例如：

//   var events = require('events'); 
//   var emitter = new events.EventEmitter(); 
//   emitter.emit('error'); 

//四. 继承
//大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。