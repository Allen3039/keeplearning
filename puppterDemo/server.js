var http = require('http');
var { doCrawlData } = require('./index.js');

// doCrawlData();
http
  .createServer(async function(request, response) {
    response.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
    if (request.url.indexOf('cd') > -1) {
      const res = await doCrawlData();
      console.log(res);
      response.write(res);
      response.end();
      return;
    }
    response.end('请以 /cd 请求数据');
  })
  .listen(9999);

console.log('Server running on port 9999.');
