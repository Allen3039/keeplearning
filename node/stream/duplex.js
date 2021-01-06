let { Duplex } = require('stream');

// 双工流 又能读 又能写，而且读取可以没关系(互不干扰)
let d = Duplex({
  read() {
    this.push('hello');
    this.push(null);
  },
  write(chunk, encoding, callback) {
    console.log('chunk ' + chunk);
    callback();
  },
});

d.on('data', function(data) {
  console.log('data', data.toString());
});
d.write('hello');

// 作者：白伟业
// 链接：https://juejin.im/post/6844903589555470350
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
