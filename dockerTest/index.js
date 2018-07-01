const http = require("http");
http
  .createServer((req, res) => {
    // res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
  })
  .listen(8888);

// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.setHeader("Content-Type", "text/html");
//   res.setHeader("X-Foo", "bar");
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("ok");
// });

// server.listen(3000);
