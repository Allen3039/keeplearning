const http = require('http');
const fs = require('fs');
const path = require('path');

http
  .createServer((req, res) => {
    const file = fs.createReadStream(path.resolve(__dirname, './data.js'));
    file.pipe(res);
  })
  .listen(8001);
