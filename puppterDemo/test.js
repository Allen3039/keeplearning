const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.baidu.com');
  await page.screenshot({ path: 'bd.png' });
  await browser.close();
})();


var http = require('http');
var express = require('express');
var app = express();
app.use("/public", express.static(__dirname + '/public'));

// 创建服务端
http.createServer(app).listen('80', function() {
	console.log('启动服务器完成');
});