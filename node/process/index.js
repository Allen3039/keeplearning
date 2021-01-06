const cluster = require('cluster');
const os = require('os');
const http = require('http');

if (cluster.isMaster) {
  for (let index = 0; index < os.cpus().length; index++) {
    console.log(`start server ${index}`);
    cluster.fork({ index });
  }
} else {
  const app = http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`content from process.env.index:${process.env.index}`);
  });
  app.listen(8000, () => {
    console.log(`process.env.index:${process.env.index} start server`);
  });
}
