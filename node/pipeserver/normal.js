const http = require('http');
const fs = require('fs');
const path = require('path');

http
  .createServer((req, res) => {
    const file = fs.readFileSync(path.resolve(__dirname, './data.js'));
    res.end(file);
  })
  .listen(8000);
