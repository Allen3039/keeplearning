const http = require('http');
const { fork } = require('child_process');
const path = require('path');
const net = require('net');

const server = net.createServer();
server.listen(8001);

const child_process = fork('fork_process.js');
child_process.on('message', (msg) => {
  console.log('msg', msg);
});

child_process.send('server', server);

process.title = 'xx';
