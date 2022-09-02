// 在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。

// 满足以下条件的变量是全局变量：
// 1. 在最外层定义的变量；
// 2. 全局对象的属性；
// 3. 隐式定义的变量（未定义直接赋值的变量）。
// 申明全局变量a = 10 (没有var)

//1. _filename
console.log( __filename ); //C:\Users\14495\Desktop\node\10_globalObject\globalObject.js
//当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。

//2. _dirname
console.log( __dirname ); //C:\Users\14495\Desktop\node\10_globalObject
//表示当前执行脚本所在的目录。

//3. setTimeout(cb, ms)---clearTimeout(t)
//指定的毫秒(ms)数后执行指定函数(cb)。：setTimeout() 只执行一次指定函数。
function printHello(){
    console.log( "Hello, World!");
 }
 // 两秒后执行以上函数
 var t = setTimeout(printHello, 2000);
 // 清除定时器
 clearTimeout(t);

//4. setInterval(cb, ms)-clearInterval(t) 
//在指定的毫秒(ms)数后执行指定函数(cb)。不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。

//5. console
console.info("程序开始执行："); //同log
var counter = 10;
console.log("计数: %d", counter);
console.time("获取数据"); //打印代码运行开始时间，计时开始
//
// 执行一些代码
// 
console.timeEnd('获取数据'); //打印代码运行结束时间，计时结束
console.info("程序执行完毕。")

//6. process
// 用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。

// 输出到终端
process.stdout.write("Hello World!" + "\n"); //Hello World!

// 通过参数读取
process.argv.forEach(function(val, index, array) {
   console.log(index + ': ' + val);
}); //argv 属性返回一个数组，由命令行执行脚本时的各个参数组成。它的第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数。

// 获取执行路径
console.log(process.execPath); //C:\Program Files\nodejs\node.exe

// 平台信息
console.log(process.platform); //win32

// 输出当前目录 
console.log('当前目录: ' + process.cwd());

// 输出当前版本
console.log('当前版本: ' + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());

//7. module
// module代表当前模块本身，exports就是module的属性，既可以使用exports，也可使用module.exports