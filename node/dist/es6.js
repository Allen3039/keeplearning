"use strict";

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const http = require('http');
var server = _http["default"].createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hellodsdsccc nima111\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/'); // export default server;