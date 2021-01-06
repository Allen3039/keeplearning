const http2 = require('http2');
const getFileInfo = require('./helper');
const path = require('path');
const fs = require('fs');

const { HTTP2_HEADER_PATH } = http2.constants;
console.log('HTTP2_HEADER_PATH', HTTP2_HEADER_PATH);

const test = getFileInfo(path.resolve(__dirname, './html/index.html'));
console.log('test', test);

const server = http2.createSecureServer(
  {
    cert: fs.readFileSync(path.resolve(__dirname, './ssl/server.crt')),
    key: fs.readFileSync(path.resolve(__dirname, './ssl/server.key')),
  },
  (req, res) => {
    req.headers;
    console.log('req.headers', req.headers);
    const sourcePath = req.headers[HTTP2_HEADER_PATH];
    const spath = sourcePath === '/' ? 'index.html' : '.' + sourcePath;
    console.log('spath', spath);
    const tmpl = getFileInfo(path.resolve(__dirname, './html', spath));
    console.log('tmpl', tmpl);

    if (spath === 'index.html') {
      res.stream.pushStream(
        {
          [HTTP2_HEADER_PATH]: '/p1.js',
        },
        (_, ps) => {
          const p1 = getFileInfo(path.resolve(__dirname, './html/p1.js'));
          ps.respondWithFD(p1.fd, p1.headers);
        }
      );
    }
    res.stream.respondWithFD(tmpl.fd, tmpl.headers);
  }
);

server.listen(8888, (err) => {
  console.log('listen 8888');
});
