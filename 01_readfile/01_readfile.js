var fs = require('fs');

var context = fs.readFileSync('file.txt');

console.log(context.toString());
console.log('读取结束')