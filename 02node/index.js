const a = 123;
const b = 345;
const c = 456;

exports.a = a;
module.exports.c = c;

// 系统默认设置 exports = module.exports
// exports = { user: '小明' };
module.exports = { user: '小明' }