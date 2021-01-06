const http = require('http');
const net = require('net');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('child dd');
});

const socket = net.createServer;
process.on('message', (msg, sendHanlder) => {
  console.log('sendHanlder', sendHanlder);
  sendHanlder.on('connection', (socket) => {
    server.emit('connection', socket);
    console.trace();
  });
  console.log('msg', msg);
});

process.on('uncaughtException', () => {});
