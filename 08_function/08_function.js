// 1. 在 JavaScript中，一个函数可以作为另一个函数的参数。
function say(word) {
  console.log(word);
}
function execute(someFunction, value) {
  someFunction(value);
}

execute(say, "Hello");

// 2. 匿名函数
function execute(someFunction, value) {
  someFunction(value);
}

execute(function (word) {
  console.log(word);
}, "Hello");
