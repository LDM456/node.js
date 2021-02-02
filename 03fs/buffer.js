// 数组不能进行二进制数据的操作
// js数组不能像java和python等语言效率高
// bufffer内存空间开辟出固定大小的内存

// 将字符串转成buffer
var str = 'asadaad';
let buf = Buffer.from(str);
console.log(buf);

// 输出buffer内容
console.log(buf.toString());