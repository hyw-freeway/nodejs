// JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。
// 但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
// 原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。

// 官方文档里面建议使用 Buffer.from() 接口去创建Buffer对象。
// Buffer 实例一般用于表示编码字符的序列，比如 UTF-8 、 UCS2 、 Base64 、或十六进制编码的数据。
// 通过使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换。

const buf = Buffer.from("runoob", "ascii"); //创建Buffer对象
console.log(buf.toString("hex")); // 输出 72756e6f6f62
console.log(buf.toString("base64")); // 输出 cnVub29i

//支持的字符编码：ascii utf8 utf16le ucs2 base64 latin1 binary hex

//一. 创建Buffer类（创建缓冲区）
//   Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
//   Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
//   Buffer.allocUnsafeSlow(size)
//   Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
//   Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
//   Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
//   Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例

// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from("tést");

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from("tést", "latin1");

//二. 写入缓冲区
// buf.write(string[, offset[, length]][, encoding])

// string - 写入缓冲区的字符串。
// offset - 缓冲区开始写入的索引值，默认为 0 。
// length - 写入的字节数，默认为 buffer.length
// encoding - 使用的编码。默认为 'utf8' 。
// 返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。
buf7 = Buffer.alloc(256);
len = buf7.write("www.runoob.com");
console.log("写入字节数 : " + len); //写入字节数 : 14

//三. 从缓冲区读数据
// buf.toString([encoding[, start[, end]]])

// encoding - 使用的编码。默认为 'utf8' 。
// start - 指定开始读取的索引位置，默认为 0。
// end - 结束位置，默认为缓冲区的末尾。
// 解码缓冲区数据并使用指定的编码返回字符串。
buf8 = Buffer.alloc(26);
for (var i = 0; i < 26; i++) {
  buf8[i] = i + 97;
}
console.log(buf8.toString("ascii")); // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf8.toString("ascii", 0, 5)); //使用 'ascii' 编码, 并输出: abcde
console.log(buf8.toString("utf8", 0, 5)); // 使用 'utf8' 编码, 并输出: abcde
console.log(buf8.toString(undefined, 0, 5)); // 使用默认的 'utf8' 编码, 并输出: abcde

//四. Buffer转JSON对象
// buf.toJSON()

const buffer = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buffer);
console.log(json); // 输出: {"type":"Buffer","data":[1,2,3,4,5]}

const copy = JSON.parse(json, (key, value) => {
  return value && value.type === "Buffer" ? Buffer.from(value.data) : value;
});
console.log(copy); // 输出: <Buffer 01 02 03 04 05>

//五. 缓冲区合并
// Buffer.concat(list[, totalLength])

// list - 用于合并的 Buffer 对象数组列表。
// totalLength - 指定合并后Buffer对象的总长度。
// 返回一个多个成员合并的新 Buffer 对象。
var buffer1 = Buffer.from("菜鸟教程");
var buffer2 = Buffer.from("www.runoob.com");
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log("buffer3 内容: " + buffer3.toString()); //buffer3 内容: 菜鸟教程www.runoob.com

//六. 缓冲区比较
// buf.compare(otherBuffer); //返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。

//七. 拷贝缓冲区
// buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])

// targetBuffer - 要拷贝的 Buffer 对象。
// targetStart - 数字, 可选, 默认: 0
// sourceStart - 数字, 可选, 默认: 0
// sourceEnd - 数字, 可选, 默认: buffer.length
var buffer4 = Buffer.from('abcdefghijkl');
var buffer5 = Buffer.from('RUNOOB');
//将 buf2 插入到 buf1 指定位置上
buffer5.copy(buffer4, 2, 2, 5);
console.log(buffer4.toString()); //abNOOijkl,将buffer5的3至5插入到buffer4的2之后

//八. 缓冲区裁剪
// buf.slice([start[, end]])

// start - 数字, 可选, 默认: 0
// end - 数字, 可选, 默认: buffer.length
// 返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。

//九. 缓冲区长度
// buf.length; //返回 Buffer 对象所占据的内存长度。