const fs = require('fs');
const http = require('http');

// fs.writeFileSync('./pipeserver/baidu.html', '');
const source = fs.createReadStream('./pipeserver/data.js');
// const fileWriteStream = fs.createWriteStream('./pipeserver/baidu.html');
// http.request('http://www.baidu.com/', (res) => {
//   console.log('res', res);
//   res.on('data', (msg) => {
//     console.log('msg', msg);
//   });
// });
http.get('http://www.baidu.com/', (res) => {
  res.pipe(fileWriteStream);
});
