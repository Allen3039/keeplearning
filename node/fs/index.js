const fs = require('fs');

fs.mkdir('./test', () => {
  console.log('success mkdir test');
});

fs.writeFileSync('./test/xx.js', '11', { flag: 'a+' }, () => {});
fs.writeFileSync('./test/xx.js', '22', { flag: 'a+' }, () => {});

fs.open('./test/xx.js', (err, fd) => {
  const bufferTotal = Buffer.alloc(4);
  fs.readSync(fd, bufferTotal, 0, 2, 0);
  fs.readSync(fd, bufferTotal, 2, 2, 2);
  console.log('bufferTotal', bufferTotal.toString());
  fs.close(fd, () => {
    console.log('success closed');
  });
});
// fs.unlinkSync('./test/xx.js');
// fs.rmdir('./test', () => {
//   console.log('success rm test');
// });
