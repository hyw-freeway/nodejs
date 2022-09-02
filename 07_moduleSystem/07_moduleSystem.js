// 导出和引入模块
// 接下来我们就来创建 hello.js 文件，代码如下：

//1. 在以上示例中，hello.js 通过 exports 对象把 world 作为模块的访问接口，
//   在 main.js 中通过 require('./hello') 加载这个模块，然后就可以直接访 问 hello.js 中 exports 对象的成员函数了。

// 导出
// exports.world = function() {
//   console.log('Hello World');
// }
// exports.x = '123';

// 引入
// var hello = require('./hello');
// hello.world();
// hello.x;


//2. 有时候我们只是想把一个对象封装到模块中，格式如下：

// module.exports = function() {
//   // ...
// }
// 例如:
// //hello.js 
// function Hello() { 
//     var name; 
//     this.setName = function(thyName) { 
//         name = thyName; 
//     }; 
//     this.sayHello = function() { 
//         console.log('Hello ' + name); 
//     }; 
// }; 
// module.exports = Hello;
// 这样就可以直接获得这个对象了：

// //main.js 
// var Hello = require('./hello'); 
// hello = new Hello(); 
// hello.setName('BYVoid'); 
// hello.sayHello(); 

//3. exports 和 module.exports 的使用:
// 如果要对外暴露属性或方法，就用 exports 就行，要暴露对象(类似class，包含了很多属性和方法)，就用 module.exports。